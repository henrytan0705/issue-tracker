"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  const handleFormSubmission = async (data: IssueForm) => {
    try {
      const response = await axios.post("/api/issues", data);
    } catch (err) {
      console.error(err);
    }

    router.push("/issues");
  };

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => handleFormSubmission(data))}
    >
      <h1>New Issue</h1>

      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description…" {...field} />
        )}
      />

      <Button type="submit">Create Issue</Button>
    </form>
  );
};

export default NewIssuePage;
