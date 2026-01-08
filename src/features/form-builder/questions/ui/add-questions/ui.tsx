import { Button } from "@/shared/ui";
import { useQuestion } from "../../lib";

export const AddQuestion = () => {
  const { addQuestion } = useQuestion();

  return <Button onClick={addQuestion}>Добавить новый вопрос</Button>;
};
