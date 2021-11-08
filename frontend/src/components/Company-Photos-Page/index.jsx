import React, { useState, useCallback, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { useParams } from 'react-router-dom';
import { Pagination, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BackendClient } from '../../common/clients';
import { useNotifications } from '../../hooks/notification';

const FIXED_PHOTO_BATCH_SIZE = 10;

export const CompanyPhotosPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setLoadingState] = useState(true);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, updatePhotoList] = useState({});
  const [currentPhotoCountState, updatePhotoCountState] = useState(0);

  const { companyId } = useParams();

  useNotifications();
  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const _onPageChangeHandler = useCallback(
    async (page, pageSize) => {
      console.log('requesting image: ', page, pageSize);
      const offset = pageSize * (page - 1);
      const photoList = await BackendClient.getCompanyPhotos(
        companyId,
        page,
        offset,
        FIXED_PHOTO_BATCH_SIZE,
      );
      updatePhotoList(photoList);
      updatePhotoCountState(FIXED_PHOTO_BATCH_SIZE * (photos.page - 1) + 1);
      setLoadingState(false);
    },
    [companyId, photos.page],
  );

  // const _imageUploadHandler = useCallback(
  //   async ({ onSuccess, onError, ...fileOptions }) => {
  //     try {
  //       await BackendClient.uploadCompanyImage(companyId, fileOptions);
  //       onSuccess(true);
  //     } catch (error) {
  //       onError(error.message);
  //     }
  //   },
  //   [companyId],
  // );

  useEffect(() => {
    _onPageChangeHandler(1, FIXED_PHOTO_BATCH_SIZE);
  }, [_onPageChangeHandler]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div>
        <span
          style={{
            fontFamily: 'Noto Sans',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          Amazon.com Photos
        </span>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px 0',
          }}
        >
          <div>
            Photos{' '}
            <b>
              {currentPhotoCountState} - {currentPhotoCountState + photos.docs.length - 1}
            </b>{' '}
            of <b>{photos.totalDocs}</b>
          </div>
          <div>
            <Upload
              action={`https://indeed-group-project.free.beeceptor.com/api/${companyId}/images/upload`}
              listType="picture"
              multiple={true}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
        </div>
        <Gallery photos={photos.docs} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
      <br />
      <Pagination
        onChange={_onPageChangeHandler}
        defaultPageSize={FIXED_PHOTO_BATCH_SIZE}
        defaultCurrent={1}
        total={photos.totalDocs}
      />
    </div>
  );
};
