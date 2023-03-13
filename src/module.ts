import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';
import { addEditor } from 'editor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel);

plugin.setPanelOptions((builder) => addEditor(builder));
