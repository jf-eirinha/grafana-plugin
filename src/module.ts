import { PanelPlugin } from '@grafana/data';
import { Options } from './types';
import { SimplePanel } from './components/SimplePanel';
import { addEditor } from 'editor';

export const plugin = new PanelPlugin<Options>(SimplePanel);

plugin.setPanelOptions((builder) => addEditor(builder));
