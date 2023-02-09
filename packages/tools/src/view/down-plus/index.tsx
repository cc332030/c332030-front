import React, {useRef, useState} from 'react';
import {Button, Card, Input, Space} from 'antd';

import HttpSchemeEnum from "enums/HttpSchemeEnum";
import ReactUtils from "utils/ReactUtils";

import {CBody} from "c-common";

import './index.scss';

const { TextArea } = Input;

function Index() {

  const [value, setValue] = useState('');
  const decodeValue = !value ? '' : decodeURIComponent(value.trim());
  const aButton = useRef(null);

  return (
    <CBody>
      <Card bordered={false} hoverable={true}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}

        <a ref={ aButton }
          className={ 'display-none' }
          href={ getAHref(decodeValue) }
        >#</a>

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
            onClick={ () => ReactUtils.doHtmlElement(aButton, {
              action: e => e.click()
            })}
          >{ urlTypeText(decodeValue) }下载</Button>

          <Button type={ 'primary' }
            disabled={ !decodeValue }
            onClick={ () => ReactUtils.doHtmlElement(aButton, {
              action: e => e.click(),
              before: e => {
                e.setAttribute('href', `/proxy?url=${decodeValue}`)
                e.setAttribute('target', '_blank')
              },
              after: e => {
                e.setAttribute('href', decodeValue)
                e.removeAttribute('target')
              }
            })}
          >加速下载</Button>

        </Space>
      </Card>
    </CBody>
  );
}

function getAHref(decodeValue: string): string {
  if(!decodeValue) {
    return '#';
  }
  return decodeValue;
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


export default Index;
