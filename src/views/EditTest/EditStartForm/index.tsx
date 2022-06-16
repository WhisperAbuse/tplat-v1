import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Textarea from '@/uikit/Textarea';
import Autocomplete, { AutocompleteItem } from '@/uikit/Autocomplete';
import Input from '@/uikit/Input';

import {
  collection,
  doc,
  DocumentData,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import noop from '@/utils/noop';
import { auth, firestore } from '@/lib/firebase';
import SectionLabel from '@/views/CreateTest/SectionLabel';

import ImageDropzone from '@/shared/ImageDropzone';
import useImageUpload from '@/hooks/useImageUpload';
import { IMaterial } from '@/views/CreateTest/CreateTestStart';
import { uploadFile } from '@/utils/uploadImage';
import MaterialImageLoadPreview from '@/shared/MaterialImageLoadPreview';
import { transliterate } from '@/utils/transliterate';
import SaveIcon from '@mui/icons-material/Save';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

interface IProps {
  className?: string;
}

const categories: AutocompleteItem[] = [
  {
    value: 'History',
    label: 'История',
  },
  {
    value: 'Military vehicle',
    label: 'Военная техника',
  },
  {
    value: 'Math',
    label: 'Математика',
  },
];

const EditStartForm: FC<IProps> = ({ className }) => {
  const router = useRouter();
  const testsRef = collection(
    doc(collection(firestore, 'users'), auth.currentUser?.uid),
    'tests'
  );
  const { slug } = router.query;

  const [testTemplates, testsLoading] = useCollection(testsRef);

  const templates = testTemplates?.docs.map((doc) => doc.data()) || [];
  const template = templates.find((template) => template?.slug === slug);

  const defaultValues: DocumentData = {
    title: template?.title,
    requirements: template?.requirements,
    description: template?.description,
    category: template?.category,
  };

  const { register, handleSubmit, reset, watch, formState, setValue } = useForm(
    {
      defaultValues,
      mode: 'onChange',
    }
  );

  useEffect(() => {
    if (!testsLoading && template) reset(defaultValues);
  }, [testsLoading]);

  const createStartTest = async (values: DocumentData) => {
    const uid = auth.currentUser?.uid;

    const newDoc = {
      ...values,
    };

    const testStartRef = doc(
      collection(doc(collection(firestore, 'users'), uid), 'tests'),
      slug as string
    );

    await updateDoc(testStartRef, newDoc);

    toast.success('Тест изменен!');
  };

  const [loadedMaterials, setLoadedMaterials] = useState<IMaterial[]>([]);
  const { uploading, downloadURL, handleUploadFile } = useImageUpload();

  const getFileFromInput = (e: any) => {
    const file = Array.from(e.target.files)[0] as File;
    return file;
  };

  const uploadTitleImage = async (e: any) => {
    const file = getFileFromInput(e);
    handleUploadFile(file);
  };

  const handleLoadMaterial = async (e: any) => {
    const file = getFileFromInput(e);
    const downloadURL = await uploadFile(file, noop, noop);

    const materialsCount = loadedMaterials.length;

    const newMaterial = {
      id: materialsCount > 0 ? loadedMaterials[materialsCount - 1].id : 1,
      downloadURL,
    };
    const newLoadedMaterials = [...loadedMaterials, newMaterial];
    setLoadedMaterials(newLoadedMaterials);
  };

  const handleCategoryChange = (value: AutocompleteItem) => {
    setValue('category', value.value);
  };

  return (
    <form onSubmit={handleSubmit(createStartTest)}>
      <div>
        <SectionLabel>Титульное изображение:</SectionLabel>
        {template?.titleImage ? (
          <img
            src={template?.titleImage}
            className="object-cover w-full h-56"
          />
        ) : (
          <ImageDropzone
            uploadImage={uploadTitleImage}
            id="title-image-upload"
            name="title-image-upload"
          />
        )}
      </div>
      <div className="mt-5">
        <Input id="title" label="Заголовок" {...register('title')} />
      </div>
      <div className="mt-5">
        <SectionLabel>Категория:</SectionLabel>
        <Autocomplete items={categories} onSelect={handleCategoryChange} />
      </div>
      <div className="mt-10">
        <div className="mb-5">
          <Textarea
            id="requirements"
            label="Требования"
            hint="Здесь можно указать ограничения или важную информацию о порядке прохождения теста"
            rows={2}
            {...register('requirements')}
          />
        </div>

        <Textarea
          id="description"
          label="Описание теста"
          {...register('description')}
        />
        <div className="mt-10">
          <SectionLabel>Дополнительные материалы:</SectionLabel>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <ImageDropzone
                uploadImage={handleLoadMaterial}
                id="material-upload"
                name="material-upload"
              />
            </div>
            {loadedMaterials.map((material) => (
              <MaterialImageLoadPreview
                key={material.id}
                imgSrc={material.downloadURL}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center  gap-2 px-5 py-2 text-white bg-green-500 border border-gray-300 border-solid rounded-md hover:bg-green-600"
          >
            <SaveIcon className="w-5 h-5" />
            Сохранить Изменеия
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditStartForm;
