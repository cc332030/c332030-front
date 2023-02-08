import React, {useRef, useState} from 'react';
import {Button, Card, Input, Space} from 'antd';

import HttpSchemeEnum from "enums/HttpSchemeEnum";
import ReactUtils from "utils/ReactUtils";

import {CBody} from "c-common";

import './A.scss';

const { TextArea } = Input;

function A() {

  const [value, setValue] = useState('');
  const decodeValue = !value ? '' : decodeURIComponent(value.trim());

  const aButton = useRef(null);

  return (
    <CBody>
      <Card bordered={false} hoverable={true}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a ref={ aButton }
          className={ 'display-none' }
          href={ !decodeValue ? '#' : decodeValue }
        />

        <TextArea
          className={ 'textarea' }
          placeholder='请输入链接'
          value={ decodeValue }
          onChange={ e => setValue(e.target.value)}
        />

        <Space wrap
          size={ 'large' }
          align={ 'center' }
          style={{
            marginTop: '1rem'
          }}
        >
          <Button danger
            onClick={ () => setValue('') }
          >清空</Button>

          <Button type={ 'primary' }
            disabled={ !decodeValue }
            onClick={ () => ReactUtils.doHtmlElement(aButton, e => e.click())}
          >{ urlTypeText(decodeValue) }下载</Button>
        </Space>
      </Card>
    </CBody>
  );
}

function getHttpScheme(href: string): string | null {

  if(href) {
    const index = href.indexOf(':');
    if(index > 0) {
      const type = href.substring(0, index);
      // @ts-ignore
      return HttpSchemeEnum[type];
    }
  }

  return null;
}

function urlTypeText(href: string): string {

  const httpScheme = getHttpScheme(href);
  if(!httpScheme) {
    return '';
  }
  return httpScheme + ' ';
}


export default A;
