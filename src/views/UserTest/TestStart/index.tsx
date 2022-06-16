import { FC } from 'react';
import clsx from 'clsx';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Tip from '@/shared/Tip';
import Image from 'next/image';
import AdditionalMaterialsPreview from '@/shared/AdditionalMaterialsPreview';
import { DocumentData } from 'firebase/firestore';
import { TextField } from '@mui/material';

interface IProps {
  className?: string;
  testData: DocumentData;
  questions: DocumentData[];
  onContinue: () => void;
}

const TestStart: FC<IProps> = ({
  className,
  questions,
  onContinue,
  testData,
}) => {
  const { title, requirements, description, titleImage, category } = testData;

  console.log(questions);
  return (
    <div className={clsx('mb-10', className)}>
      <div className="relative w-full h-28 md:h-40 xl:h-52 bg-gray-50">
        {titleImage ? (
          <Image
            src={titleImage || '/test/test-start.jpg'}
            layout="fill"
            objectFit="cover"
            alt="test hero image"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-bl from-teal-700 to-green-600"></div>
        )}
      </div>
      <Container maxWidth="md" className="mt-14 md:mt-20">
        <section className="flex flex-col gap-4 mb-10 md:justify-between md:flex-row">
          <div className="w-full">
            <Typography
              component="h1"
              className="mb-4 text-xl font-medium md:text-2xl"
            >
              {title}
            </Typography>
            <div className="flex justify-between w-full gap-2">
              <div>
                <Tip>
                  <Typography className="text-sm">
                    {testData?.requirements}
                  </Typography>
                </Tip>
              </div>
              <div className="p-5 bg-gray-100 h-fit min-w-max">
                <Typography className="text-sm">
                  Раздел:{' '}
                  <span className="font-medium text-gray-600">
                    {testData?.category}
                  </span>
                </Typography>
                <Typography className="text-sm ">
                  Кол-во вопросов:{' '}
                  <span className="font-medium text-gray-600">
                    {questions?.length || ''}
                  </span>
                </Typography>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Box className="p-5 bg-gray-100 md:p-10">
            <div className="mb-5">
              <Typography className="text-base">{description}</Typography>
            </div>
            <AdditionalMaterialsPreview />
            <Button
              className="mt-10 bg-indigo-600"
              variant="contained"
              onClick={onContinue}
            >
              Начать
            </Button>
          </Box>
        </section>
      </Container>
    </div>
  );
};

export default TestStart;
