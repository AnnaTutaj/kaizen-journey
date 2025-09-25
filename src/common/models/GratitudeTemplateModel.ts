import { CategoryColorType } from '@common/containers/App/ColorPalette';
import { IUserCategory } from '@common/contexts/UserProfile/UserProfileContext';
import { v4 } from 'uuid';

export interface IGratitudeTemplateCreateForm {
  templateName: string;
  title?: string;
  description?: string;
  isPublic: boolean;
  color?: CategoryColorType;
  tags?: string[];
  categories?: IUserCategory[];
}

export interface IGratitudeTemplateCreateFormDTO {
  id: string;
  templateName: string;
  title?: string;
  description?: string;
  isPublic?: boolean;
  color?: CategoryColorType;
  tags?: string[];
  categories?: IUserCategory[];
}

export const serialize = (values: IGratitudeTemplateCreateForm): IGratitudeTemplateCreateFormDTO => {
  return {
    id: v4(),
    templateName: values.templateName,
    ...(values.title && { title: values.title }),
    ...(values.description && { description: values.description }),
    ...(values.isPublic !== undefined && { isPublic: values.isPublic }),
    ...(values.color && { color: values.color }),
    ...(values.tags && { tags: values.tags })
  };
};
export default { serialize };
