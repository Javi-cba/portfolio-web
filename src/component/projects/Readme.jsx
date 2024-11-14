import ReactMarkdown from 'react-markdown'; // lib para mostrar HTML
import { Modal } from 'antd';
import './projects.css';

export default function Readme({ open, readme, setOpen, repo }) {
  return (
    <Modal
      title={repo}
      open={open}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      className="custom-modal"
    >
      {readme ? <ReactMarkdown>{readme}</ReactMarkdown> : 'Cargando...'}
    </Modal>
  );
}
