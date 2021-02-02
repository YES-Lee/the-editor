import { TheEditor } from '../editor';

export interface Plugin extends Record<string, any> {
  /**
   * 插件名称
   */
  name: string;
  /**
   * 是否启用
   */
  enabled: boolean;
  /**
   * 插件安装方法
   * @param editor TheEditor
   * @param options 插件配置
   */
  install(editor: TheEditor, options: Record<string, any>): void;
  /**
   * 启用插件
   */
  enable(): void;
  /**
   * 禁用插件
   */
  disable(): void;
}
