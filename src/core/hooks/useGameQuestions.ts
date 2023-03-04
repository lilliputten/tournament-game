/** @module useGameQuestions
 *  @since 2023.03.04, 19:43
 *  @changed 2023.03.04, 19:43
 */

import React from 'react';

import { useQuestions, useGameSessionQuestionsIds, TQuestions } from '@/core';

export function useGameQuestions(): TQuestions | undefined {
  const questionsIds = useGameSessionQuestionsIds();
  const allQuestions = useQuestions();

  const questions = React.useMemo(() => {
    if (!allQuestions || !questionsIds) {
      return undefined;
    }
    return questionsIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter(Boolean) as TQuestions;
  }, [allQuestions, questionsIds]);

  return questions;
}
