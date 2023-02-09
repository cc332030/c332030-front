import React, {useRef, useState} from 'react';
import {Button, Card, Input, Space, Tooltip} from 'antd';

import HttpSchemeEnum from "enums/HttpSchemeEnum";
import ReactUtils from "utils/ReactUtils";

import {CBody} from "c-common";

import './index.scss';

const { TextArea } = Input;

function Index() {

  const [href, setHref] = useState('');
  const hrefDecode = !href ? '' : decodeURIComponent(href.trim());
  const aButton = useRef(null);

  return (
    <CBody>
      <Card bordered={false} hoverable={true}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}

        <a ref={ aButton }
          className={ 'display-none' }
          href={ getAHref(hrefDecode) }
        >#</a>

        <TextArea
          className={ 'textarea' }
          placeholder='请输入链接'
          value={ hrefDecode }
          onChange={ e => setHref(e.target.value)}
        />

        <Space wrap
          size={ 'large' }
          align={ 'center' }
          style={{
            marginTop: '1rem'
          }}
        >
          <Button danger
            disabled={ !href }
            onClick={ () => setHref('') }
          >清空</Button>

          <Tooltip title="跳转到链接，触发浏览器的离线下载">
            <Button type={ 'primary' }
              disabled={ !hrefDecode }
              onClick={ () => ReactUtils.doHtmlElement(aButton, {
                action: e => e.click()
              })}
            >{urlTypeText(hrefDecode)}  跳转</Button>
          </Tooltip>

          <Tooltip title={ `资源加速下载，仅支持：${proxyAllowSchemeNames.join("，")}` } >
            <Button type={ 'primary' }
              disabled={ !proxyEnable(hrefDecode) }
              onClick={ () => ReactUtils.doHtmlElement(aButton, {
                action: e => e.click(),
                before: e => {
                  e.setAttribute('href', `/proxy?url=${hrefDecode}`)
                  e.setAttribute('target', '_blank')
                },
                after: e => {
                  e.setAttribute('href', hrefDecode)
                  e.removeAttribute('target')
                }
              })}
            >加速下载</Button>
          </Tooltip>

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

const proxyAllowSchemes = [
  HttpSchemeEnum.http, HttpSchemeEnum.https
];

const proxyAllowSchemeNames = proxyAllowSchemes.map(e => e.toString());

function proxyEnable(href: string) {

  const httpScheme = getHttpScheme(href);
  if(!httpScheme) {
    return false;
  }
  return proxyAllowSchemeNames.indexOf(httpScheme) >= 0;
}

export default Index;
