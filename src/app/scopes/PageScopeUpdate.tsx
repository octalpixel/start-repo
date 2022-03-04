import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Formiz } from '@formiz/core';
import { Scope } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Loader,
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/app/layout';
import { Error404 } from '@/errors';
import { useDarkMode } from '@/hooks/useDarkMode';

import { ScopeForm } from './ScopeForm';

export const PageScopeUpdate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { colorModeValue } = useDarkMode();

  const { issue, isFetching, isError } = {
    issue: {},
    isFetching: false,
    isError: false,
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading }: TODO = {
    mutate: () => {},
    isLoading: false,
  };

  const handleOnValidSubmit = (
    values: Pick<Scope, 'name' | 'description' | 'color'>
  ) => {
    mutate(
      { id, ...values },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  return (
    <Page containerSize="lg" isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <Heading size="md">{t('scopes:update.title')}</Heading>
      </PageTopBar>
      {isFetching && <Loader />}
      {isError && !isFetching && <Error404 />}
      {!isError && !isFetching && (
        <Formiz
          autoForm
          onValidSubmit={handleOnValidSubmit}
          initialValues={issue}
        >
          <PageContent>
            <Box
              bg={colorModeValue('white', 'gray.900')}
              shadow="md"
              borderRadius="md"
              p="4"
              py="6"
            >
              <ScopeForm />
            </Box>
          </PageContent>
          <PageBottomBar>
            <Flex justifyContent="space-between">
              <Button type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="@primary" type="submit" isLoading={isLoading}>
                Update Scope
              </Button>
            </Flex>
          </PageBottomBar>
        </Formiz>
      )}
    </Page>
  );
};