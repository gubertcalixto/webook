import {
  EditorCarouselElementComponent,
} from 'src/app/editor-container/components/editor/editor-components/editor-carousel-element/editor-carousel-element.component';
import {
  EditorElipseElementComponent,
} from 'src/app/editor-container/components/editor/editor-components/editor-elipse-element/editor-elipse-element.component';
import {
  EditorGiphyElementComponent,
} from 'src/app/editor-container/components/editor/editor-components/editor-giphy-element/editor-giphy-element.component';
import {
  EditorPixabayElementComponent,
} from 'src/app/editor-container/components/editor/editor-components/editor-pixabay-element/editor-pixabay-element.component';
import {
  EditorYoutubeElementComponent,
} from 'src/app/editor-container/components/editor/editor-components/editor-youtube-element/editor-youtube-element.component';

import {
  EditorCheckboxElementComponent,
} from '../../../../components/editor/editor-components/editor-checkbox-element/editor-checkbox-element.component';
import {
  EditorImageElementComponent,
} from '../../../../components/editor/editor-components/editor-image-element/editor-image-element.component';
import {
  EditorRadioElementComponent,
} from '../../../../components/editor/editor-components/editor-radio-element/editor-radio-element.component';
import {
  EditorRectangleElementComponent,
} from '../../../../components/editor/editor-components/editor-rectangle-element/editor-rectangle-element.component';
import {
  EditorSliderElementComponent,
} from '../../../../components/editor/editor-components/editor-slider-element/editor-slider-element.component';
import {
  EditorTextElementComponent,
} from '../../../../components/editor/editor-components/editor-text-element/editor-text-element.component';
import { EditorElementDefinition } from '../../../classes/element/definition/editor-element-definition.class';

// TODO: define imagePreviewPath
// TODO: define colors
export const editorDefaultElements: EditorElementDefinition[] = [
  {
    elementId: 'wb-text',
    elementClass: EditorTextElementComponent,
    pluginId: 'default',
    label: 'Texto',
    icon: 'font',
    // TODO: use real image preview
    imagePreviewPath: 'data:image/png;base64,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'
  },
  {
    elementId: 'wb-slider',
    elementClass: EditorSliderElementComponent,
    pluginId: 'default',
    label: 'Slider',
    icon: 'sliders-h',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-checkbox',
    elementClass: EditorCheckboxElementComponent,
    pluginId: 'default',
    label: 'Checkbox',
    icon: 'check-square',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-radio',
    elementClass: EditorRadioElementComponent,
    pluginId: 'default',
    label: 'Radio',
    icon: 'dot-circle',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-rectangle',
    elementClass: EditorRectangleElementComponent,
    pluginId: 'default',
    label: 'Retângulo',
    icon: 'square',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-elipse',
    elementClass: EditorElipseElementComponent,
    pluginId: 'default',
    label: 'Elipse',
    icon: 'circle',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-image',
    elementClass: EditorImageElementComponent,
    pluginId: 'default',
    label: 'Imagem',
    icon: 'image',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-carousel',
    elementClass: EditorCarouselElementComponent,
    pluginId: 'default',
    label: 'Carousel',
    icon: 'images',
    imagePreviewPath: undefined,
  },

  {
    elementId: 'wb-giphy',
    elementClass: EditorGiphyElementComponent,
    pluginId: 'default',
    label: 'Gifs',
    icon: 'photo-video',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-pixabay',
    elementClass: EditorPixabayElementComponent,
    pluginId: 'default',
    label: 'Imagens - Pixabay',
    icon: 'camera-retro',
    imagePreviewPath: undefined,
  },
  {
    elementId: 'wb-youtube',
    elementClass: EditorYoutubeElementComponent,
    pluginId: 'default',
    label: 'Youtube',
    icon: 'video',
    imagePreviewPath: undefined,
  },
];
