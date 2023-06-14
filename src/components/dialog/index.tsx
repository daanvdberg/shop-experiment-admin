import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import {
  FC,
  Fragment,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  ComponentPropsWithoutRef,
} from "react";

interface DialogProps {
  show: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}

const SubComponent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...rest }, ref) => (
  <div className={classNames("mt-6", className)} {...rest} ref={ref}>
    {children}
  </div>
));

SubComponent.displayName = "SubComponent";

interface DialogSubComponents {
  Content: typeof SubComponent;
  Actions: typeof SubComponent;
}

const Dialog: FC<PropsWithChildren<DialogProps>> & DialogSubComponents = ({
  show,
  title,
  description,
  onClose,
  children,
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HeadlessDialog.Title>{title}</HeadlessDialog.Title>
                {description ? (
                  <HeadlessDialog.Description
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {description}
                  </HeadlessDialog.Description>
                ) : null}

                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

Dialog.displayName = "Dialog";

Dialog.Content = SubComponent;
Dialog.Actions = SubComponent;

export default Dialog;
