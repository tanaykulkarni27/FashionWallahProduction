import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import {Heading, IconClose} from '~/components';

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Drawer({
  heading,
  open,
  onClose,
  openFrom = 'right',
  children,
}: {
  heading?: string;
  open: boolean;
  onClose: () => void;
  openFrom: 'right' | 'left' | 'bottom' | 'top';
  children: React.ReactNode;
}) {
  // STATES ADDED TO HANDLE DIFFERENT DIRECTIONS
  const [animationDirection, setAnimationDirection] = useState(
    openFrom === 'bottom' || openFrom === 'top' ? 'y' : 'x',
  );

  const handleOpenFromChange = () => {
    setAnimationDirection(
      openFrom === 'bottom' || openFrom === 'top' ? 'y' : 'x',
    );
  };

  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
    bottom: 'translate-y-full',
    top: '-translate-y-full',
  };

  return (
    // https://headlessui.com/react/transition
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 ">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`fixed flex max-w-full ${
                openFrom === 'right'
                  ? 'right-0 inset-y-0'
                  : openFrom === 'left'
                  ? 'left-0 inset-y-0'
                  : openFrom === 'bottom'
                  ? 'inset-x-0 bottom-0'
                  : 'inset-x-0 top-0'
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                {/* from rounded md it's tanay's css */}
                <Dialog.Panel
                  className={`${
                    openFrom === 'bottom' || openFrom === 'top'
                      ? 'w-full'
                      : 'w-fit'
                  } text-left align-middle transition-all transform shadow-xl
                  ${openFrom === 'bottom' ? 'h-fit' : 'h-screen-dynamic'}
                rounded-md backdrop-blur-md bg-white/30 flex flex-col justify-start items-center p-5`}
                >
                  <header
                    className={`sticky top-0 flex items-center px-6 h-nav sm:px-8 md:px-12 ${
                      heading ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {heading !== null && (
                      <Dialog.Title>
                        <Heading as="span" size="lead" id="cart-contents">
                          {heading}
                        </Heading>
                      </Dialog.Title>
                    )}
                    <button
                      type="button"
                      className="p-4 -m-4 transition text-primary hover:text-primary/50"
                      onClick={onClose}
                      data-test="close-cart"
                    >
                      <IconClose aria-label="Close panel" />
                    </button>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}
