import * as Form from "@radix-ui/react-form";
import { FormEvent, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Dialog from "~/components/dialog";
import { Button } from "~/components/button";
import AddCategoryForm from "./AddCategoryForm";

const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 pb-4 sm:flex md:divide-x md:divide-gray-100">
      <Form.Root className="w-60">
        <Form.Field className="mb-[10px] grid" name="email">
          <Form.Label className="sr-only text-sm font-medium">
            Search
          </Form.Label>
          <Form.Control asChild>
            <input
              className="selection:color-white box-border inline-flex h-10 w-full appearance-none items-center justify-center rounded border border-slate-200 bg-slate-50 px-2 text-sm leading-none outline-none selection:bg-slate-100 focus:border-slate-400"
              type="email"
              placeholder="Search..."
              required
            />
          </Form.Control>
        </Form.Field>
      </Form.Root>
      <button
        className="inline-flex items-center whitespace-nowrap rounded bg-slate-500 px-4 py-2 text-sm
       text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Category&nbsp;
        <PlusIcon className="h-[19px] w-[19px]" />
      </button>
      <Dialog show={isOpen} onClose={closeModal} title="Add New Category">
        <Dialog.Content>
          <AddCategoryForm onSubmit={handleSubmit} />
        </Dialog.Content>
        <Dialog.Actions className="flex justify-end">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button className="ml-4" type="submit" form="add-category">
            Submit
          </Button>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default Toolbar;
