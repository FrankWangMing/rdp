import React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Dropdown, Menu } from '@alifd/next';
import './index.scss';
export interface IProps {
  logo?: string;
  href?: string;
  scenarioInfo?: any;
  scenarioDisplayName?: string;
}

const Logo: React.FC<IProps> = (props): React.ReactElement => {
  const { scenarioDisplayName, scenarioInfo } = props;
  const urls = scenarioInfo?.urls || [];
  return (
    <div className="lowcode-plugin-logo">
      <a className="logo" target="blank" href={props.href || 'https://lowcode-engine.cn'} style={{ backgroundImage: `url(${props.logo})` }} />
    </div>
  );
};
// 示例 Logo widget
const LogoSamplePlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton, config } = ctx;
      const scenarioDisplayName = config.get('scenarioDisplayName');
      const scenarioInfo = config.get('scenarioInfo');
      // 注册 logo widget
      skeleton.add({
        area: 'topArea',
        type: 'Widget',
        name: 'logo',
        content: <Logo scenarioDisplayName={scenarioDisplayName} scenarioInfo={scenarioInfo}  />,
        contentProps: {
          logo: 'https://official-site-static.yuansuan.com/image/cc3809cd965dff2edb69f57772bd92a1',
          href: 'https://www.yuansuan.com',
        },
        props: {
          align: 'left',
        },
      });
    },
  };
}
LogoSamplePlugin.pluginName = 'LogoSamplePlugin';
LogoSamplePlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default LogoSamplePlugin;