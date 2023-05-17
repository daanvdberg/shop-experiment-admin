import * as Form from "@radix-ui/react-form";
import { CustomMatcher } from "@radix-ui/react-form";
import { ValidityMatcher } from "@radix-ui/react-form";
import { FormEvent, HTMLInputTypeAttribute } from "react";
import Select, { SelectOption } from "~/components/select";

interface Props {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

type Field = {
  id: string;
  label?: string;
  name?: string;
  description?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  messages?: { id: ValidityMatcher | CustomMatcher; label: string }[];
  required?: boolean;
  options?: SelectOption[]; // Render as select
};

const fields: Field[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    description: "The name is how it appears on your site.",
    messages: [
      {
        id: "valueMissing",
        label: "Please enter a category name",
      },
    ],
    required: true,
  },
  {
    id: "slug",
    label: "Slug",
    type: "text",
    description:
      "The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.",
    messages: [
      {
        id: "valueMissing",
        label: "Please enter a slug",
      },
    ],
    required: true,
  },
  {
    id: "description",
    label: "Description",
    type: "text",
  },
  {
    id: "image",
    label: "Thumbnail",
    type: "image",
  },
  {
    id: "parentCategory",
    label: "Parent Category",
    type: "image",
    description:
      "Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop and Big Band.",
    required: true,
    options: [
      { label: "CAT1", value: "cat1" },
      { label: "CAT2", value: "cat2" },
    ],
  },
];

const AddCategoryForm = ({ onSubmit }: Props) => {
  return (
    <Form.Root className="w-full" id="add-category" onSubmit={onSubmit}>
      {fields.map((field) => (
        <Form.Field
          key={field.id}
          className="relative mb-2"
          name={field.name || field.id}
        >
          <div className="flex items-baseline justify-between">
            <Form.Label className="mb-2 block text-sm font-medium text-gray-900">
              {field.label || field.id}
            </Form.Label>
            {field.messages
              ? field.messages.map((message) => (
                  <Form.Message
                    key={message.id as string}
                    className="mb-2 block text-xs font-light text-slate-700"
                    match={message.id}
                  >
                    {message.label}
                  </Form.Message>
                ))
              : null}
          </div>
          <Form.Control asChild>
            {field.options ? (
              <Select
                id={field.id}
                options={field.options}
                label={field.label || field.id}
                {...(field.required ? { required: true } : {})}
              />
            ) : (
              <input
                id={field.id}
                className="inline-flex h-10 w-full items-center rounded-lg border border-gray-300 bg-gray-50 px-2.5 text-gray-900 shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                type={field.type}
                {...(field.required ? { required: true } : {})}
              />
            )}
          </Form.Control>
        </Form.Field>
      ))}
    </Form.Root>
  );
};

export default AddCategoryForm;
