import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

const styleDropzone = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    padding: '20px 10px',
    textAlign: 'center'
}
const activeDropzone = {
    border: "dashed 3px green"
}
export default function PhotoUploadDropzone({ setFiles }) {
    const onDrop = useCallback(acceptedFiles => {
        console.log('DRPING FILES---', acceptedFiles);
        setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? { ...styleDropzone, ...activeDropzone } : styleDropzone}>
            <input {...getInputProps()} />
            <Icon name="upload" size="huge" />
            <Header content="Drag and drop your photo here!" />
        </div>
    )
}