// import { ClassNameMap, CombinedClassKey } from 'notistack'
// import { makeStyles } from '@material-ui/core/styles'
// import { theme } from 'react-components'

// type DefaultTheme = typeof theme

// interface StyleProps {
//     theme: DefaultTheme
//     isMobile: boolean
// }

// const useStyles: (props: StyleProps) => Partial<ClassNameMap<CombinedClassKey>> = makeStyles({
//     containerRoot: ({ isMobile, theme }) => ({
//         padding: `0 ${isMobile ? '0.3125rem' : theme.spacing.xSmall}`,
//         '& > .MuiCollapse-container': {
//             padding: 0,
//             '& > .MuiCollapse-wrapper': {
//                 margin: `${isMobile ? '0.3125rem' : theme.spacing.xSmall} 0`,
//             },
//         },
//     }),
//     containerAnchorOriginTopRight: {
//         top: 0,
//         right: 0,
//     },
//     containerAnchorOriginTopCenter: {
//         top: 0,
//     },
//     root: ({ theme }: StyleProps) => ({
//         '& > .MuiSnackbarContent-root': {
//             width: '310px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//             flexWrap: 'nowrap',
//             borderRadius: theme.typography.border.radius.small,
//             boxShadow: '0 4px 4px 0 #00000040',
//             padding: `${theme.spacing.small} 0.625rem 0.6875rem`,
//             '& .MuiSnackbarContent-message > span': {
//                 alignItems: 'flex-start',
//             },
//             '& .MuiSnackbarContent-message, & .MuiSnackbarContent-action': {
//                 margin: 0,
//                 padding: 0,
//             },
//             '& .MuiSnackbarContent-message .MuiSvgIcon-root': {
//                 marginInlineEnd: theme.spacing.xSmall,
//             },
//             '& .MuiSnackbarContent-action .MuiSvgIcon-root': {
//                 marginInlineStart: '0.6875rem',
//             },
//             '& .MuiSnackbarContent-message .MuiSvgIcon-root, & .MuiSnackbarContent-action .MuiSvgIcon-root': {
//                 fontSize: theme.typography.font.size.large,
//                 width: '1.1875rem',
//                 height: '1.1875rem',
//                 display: 'inline-block',
//                 flexShrink: 0,
//             },
//         },
//         '& *': {
//             fontFamily: theme.typography.font.family.lato,
//             fontSize: '0.9375rem',
//         },
//     }),
//     variantInfo: ({ theme }: StyleProps) => ({
//         backgroundColor: theme.colors.tfwBlack12,
//         color: theme.colors.tfwBlack87,
//     }),
// })

// export default useStyles
