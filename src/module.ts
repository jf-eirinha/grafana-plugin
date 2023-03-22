import { PanelPlugin } from '@grafana/data';
import { SimplePanel } from './components/SimplePanel';
import { addEditor, Options } from 'editor';

export const plugin = new PanelPlugin<Options>(SimplePanel);

plugin.setPanelOptions((builder) => addEditor(builder));
