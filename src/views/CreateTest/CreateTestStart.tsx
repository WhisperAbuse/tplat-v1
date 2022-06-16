import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import SectionLabel from './SectionLabel';

import Textarea from '@/uikit/Textarea';
import Autocomplete, { AutocompleteItem } from '@/uikit/Autocomplete';
import Input from '@/uikit/Input';

import ImageDropzone from '@/shared/ImageDropzone';
import MaterialImageLoadPreview from '@/shared/MaterialImageLoadPreview';

import useImageUpload from '@/hooks/useImageUpload';

import { uploadFile } from '@/utils/uploadImage';
import noop from '@/utils/noop';
import {
  collection,
  doc,
  DocumentData,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { transliterate } from '@/utils/transliterate';

import { auth, firestore } from '@/lib/firebase';
import { availableStatuses } from '@/constants/statuses';

export interface IMaterial {
  id: number;
  downloadURL: string;
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

interface IProps {
  className?: string;
}

const defaultValues: DocumentData = {
  title: '',
  requirements: '',
  description: '',
  category: '',
};

const CreateTestStart: FC<IProps> = ({ className }) => {
  const router = useRouter();

  const { register, handleSubmit, reset, watch, formState, setValue } = useForm(
    {
      defaultValues,
      mode: 'onChange',
    }
  );

  const { errors, isDirty, isValid } = formState;

  const createStartTest = async (values: DocumentData) => {
    const uid = auth.currentUser?.uid;

    const slug = encodeURI(kebabCase(transliterate(values.title)));

    const newDoc = {
      ...values,
      slug,
      titleImage: downloadURL,
      uid,
      status: availableStatuses.to_be_filled,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const testStartRef = doc(
      collection(
        doc(collection(firestore, 'users'), auth.currentUser?.uid),
        'tests'
      ),
      slug
    );

    await setDoc(testStartRef, newDoc);

    toast.success('Test created!');
    router.push(`/tests/${auth.currentUser?.uid}/${slug}`);
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
    <div className={clsx('max-w-4xl px-5 mx-auto mt-10', className)}>
      <h1 className="text-2xl font-semibold text-gray-900">
        Создание нового теста
      </h1>
      <div className="mt-5 mb-20">
        <form onSubmit={handleSubmit(createStartTest)}>
          <div>
            <SectionLabel>Титульное изображение:</SectionLabel>
            {downloadURL ? (
              <img src={downloadURL} className="object-cover w-full h-56" />
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
            <div className="mt-10">
              <button
                className="px-8 py-2 text-white bg-blue-600 rounded-md"
                type="submit"
              >
                Продолжить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestStart;
