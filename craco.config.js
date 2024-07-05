const path = require('path')

module.exports = {
    webpack: {
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@asset': path.resolve(__dirname, 'src/assets/'),
            '@image': path.resolve(__dirname, 'src/assets/images/'),
            '@icon': path.resolve(__dirname, 'src/assets/icons/'),
            '@view': path.resolve(__dirname, 'src/views/'),
            '@component': path.resolve(__dirname, 'src/components/'),
            '@style': path.resolve(__dirname, 'src/styles/'),
            '@store': path.resolve(__dirname, 'src/store/'),
            '@helper': path.resolve(__dirname, 'src/helpers/'),
            '@context': path.resolve(__dirname, 'src/contexts/'),
            '@hook': path.resolve(__dirname, 'src/hooks/'),
            '@service': path.resolve(__dirname, 'src/services/'),
        },
    },
}
