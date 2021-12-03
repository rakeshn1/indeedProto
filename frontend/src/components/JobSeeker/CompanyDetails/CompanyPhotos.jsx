import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Pagination, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { insertPhoto, getCompanyPhotos } from "../../../services/admin";
import _ from "lodash";
import AWS from "aws-sdk";

const FIXED_PHOTO_BATCH_SIZE = 3;

const CompanyPhotos = (props) => {
  const {
    companyDetails: { name, _id: companyId },
  } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setLoadingState] = useState(true);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [completePhotos, updatePhotoList] = useState([]);
  const [currentPhotosBatch, updateCurrentPhotosBatch] = useState([]);
  const [currentPhotosPage, changeCurrentPhotosPage] = useState(1);

  const updateCompanyPhotos = useCallback(() => {
    getCompanyPhotos(companyId).then((photos) => {
      updatePhotoList(photos);
      const chunks = _.chunk(photos, FIXED_PHOTO_BATCH_SIZE);
      updateCurrentPhotosBatch(chunks[0]);
      setLoadingState(false);
    });
  }, [companyId])

  const uploadProps = {
    multiple: false,
    customRequest({ file, onError, onProgress, onSuccess }) {
      AWS.config.update({
        accessKeyId: "AKIAZB5SOMYZMQLSOF4R",
        region: "us-west-1",
        secretAccessKey: "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",
      });

      const S3 = new AWS.S3();
      console.log("file", file);
      console.log("DEBUG filename", file.name);
      console.log("DEBUG file type", file.type);

      const objParams = {
        Bucket: "indeed-proto-2",
        Key: `${companyId}/${new Date().toISOString()}-${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      S3.upload(objParams, async (err, data) => {
        console.log("data", data);
        if (err) {
          onError();
          console.log("Something went wrong");
          console.log(err.code);
          console.log(err.message);
        } else {
          onSuccess(data, file);
          await insertPhoto({ companyId, imageURL: data.Location }).then(updateCompanyPhotos);
          console.log("SEND FINISHED", data);
        }
      });
    },
  };

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const _onPageChangeHandler = useCallback(async (page, pageSize) => {
    console.log("requesting image: ", page, pageSize);
    changeCurrentPhotosPage(page);
  }, []);

  useEffect(() => {
    const chunks = _.chunk(completePhotos, FIXED_PHOTO_BATCH_SIZE);
    updateCurrentPhotosBatch(chunks[currentPhotosPage-1]);
  }, [completePhotos, currentPhotosPage]);

  
  useEffect(() => {
    updateCompanyPhotos()
  }, [updateCompanyPhotos]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div>
        <span
          style={{
            fontFamily: "Noto Sans",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          {name} Photos
        </span>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <div>
          </div>
          <div>
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
        </div>
        <Gallery
          photos={currentPhotosBatch.map((photo) => ({
            src: photo.S3Url,
            width: 1,
            height: 1,
          }))}
          onClick={openLightbox}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={currentPhotosBatch.map((image) => ({
                  source: image.S3Url
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
        defaultCurrent={currentPhotosPage}
        total={completePhotos.length}
      />
    </div>
  );
};

export default CompanyPhotos;
