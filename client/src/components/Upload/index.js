import React, { useMemo, useState, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Progress, Message } from 'semantic-ui-react'
import uploadFiles from '../../context/actions/files/uploadFiles'
import { GlobalContext } from '../../context/Provider'
import { useHistory } from 'react-router-dom'
import {fileLimitBytes} from '../../constants/fileLimitBytes'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

const UploadComponent = ({path, setOpen}) => {
    const history = useHistory()
    const {fmState, fmDispatch} = useContext(GlobalContext)
    const [percent, setPercent] = useState(0)
    const [sizeOverload, setSizeOverload] = useState(false)
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone()

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ])

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ))

    const sendFiles = () => {
      setSizeOverload(false)
      let fd = new FormData()
      let size = 0
      acceptedFiles.map((file) => {
          fd.append('files', file)
          size += file.size
          return file
      })
      if(size > fileLimitBytes){
        setSizeOverload(true)
        return;
      }
      uploadFiles(fd, path, setPercent, setOpen)(fmDispatch)(history)
    }

    const formatBytes = (bytes, decimals = 2) => {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <section className="container">
            <Message
              content={`Max files size ${formatBytes(fileLimitBytes)}`}
              color={sizeOverload?"red":"blue"}
            />

            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {fmState.addFile.loading === true && (
              <Progress percent={percent} indicating />
            )}
            {fmState.addFile.loading && percent === 100 && (
              <Message
                content={'Finishing upload...Please wait one more second...'}
                color={"yellow"}
              />
            )}
            <aside style={{marginTop: '1rem'}}>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
            <div style={{textAlign: 'center', marginTop: '1rem'}}>
                <Button color={'green'} onClick={() => sendFiles()} loading={fmState.addFile.loading} disabled={files.length > 0?false:true}>
                    Send
                </Button>
                {/*TODO: clear files */}
            </div>
        </section>
    )
}

export default UploadComponent
