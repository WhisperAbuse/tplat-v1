/*
  Available statuses:

  to_be_filled - Test start is created, template to be filled with questions and possible answers
  ready_for_publication - All requirements for a test are completed, ready to be published 
  published
*/

export const availableStatuses = {
  to_be_filled: 'to_be_filled',
  ready_for_publication: 'ready_for_publication',
  published: 'published',
};

export type StatusKey = keyof typeof availableStatuses;

export const statusNamesMap: {
  [key in StatusKey]: string;
} = {
  to_be_filled: 'Нуждается в заполнении',
  ready_for_publication: 'Готово к публикации',
  published: 'Опубликовано',
};
