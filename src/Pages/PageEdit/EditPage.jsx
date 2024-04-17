import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { pagesData, updatePage } from '../../store/pagesSlice';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Btn } from '../../AbstractElements';

const EditPage = () => {
  const storeVar = useSelector(state => state.page)
  const dispatch = useDispatch();
  const location = useLocation(); 

  const [formVar, setFormVar] = useState({
    pageId: null,
    editerData: null,
    title: '',
  });

  useEffect(() => {
    const pageId = new URLSearchParams(location.search).get('id');
    if (pageId) {
      setFormVar((prevFormVar) => ({ ...prevFormVar, pageId: pageId }))
      dispatch(pagesData(pageId))
    }
  }, []);

  const onChange = (editor) => {
    const evt = editor.getData()
    setFormVar((prevFormVar) => ({ ...prevFormVar, editerData: evt }))
  };
  const onFocus = (editor) => {
    const evt = editor.getData()
    setFormVar((prevFormVar) => ({ ...prevFormVar, editerData: evt }))
  }

  const submit = () => {
    console.log({ editerData: storeVar.pageDesc, textData: formVar.editerData });

    dispatch(updatePage({ pageId: formVar.pageId, desc: formVar.editerData, title: storeVar.pageTitle }))
  }
  return (
    <Fragment>

      <Col sm='12'>
        <Card>
          <CardHeader>
            <p>{storeVar.pageTitle}</p>
          </CardHeader>
          <CardBody>
            <CKEditor
              editor={ClassicEditor}
              data={storeVar.pageDesc}
              onReady={editor => {
                onFocus(editor)
              }}
              onChange={(event, editor) => {
                onChange(editor);
              }}
              onBlur={(event, editor) => {
              }}
              onFocus={(event, editor) => {
                onFocus(editor)
              }}
            />
          </CardBody>
        </Card>
        <div className='d-flex align-items-center justify-content-center pb-5'>
          <Btn attrBtn={{ color: 'primary', onClick: submit }}>Save Changes</Btn>
        </div>
      </Col>

    </Fragment>
  );
};

export default EditPage;
