import { Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

import { classNames } from "../../utils";

type ModalProps = {
	children: ReactNode;
	show: boolean;
	setShow: () => void;
};

const Modal = (props: ModalProps) => {
	const { children, show, setShow } = props;

	if (show) {
		document.documentElement.style.overflow = "hidden";
	} else {
		document.documentElement.style.overflow = "";
	}

	return (
		<Transition appear show={show} as={Fragment}>
			<div
				className={classNames(
					"fixed inset-0 flex justify-center items-center z-50 px-4 py-4 overflow-auto max-w-[100vw]"
				)}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						onClick={setShow}
						className="fixed inset-0 dark:bg-white bg-black dark:bg-opacity-40 bg-opacity-40 backdrop-blur-md"
					/>
				</Transition.Child>

				<div className="flex min-h-full items-center justify-center text-center">
					<Transition.Child
						as={"div"}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{children}
					</Transition.Child>
				</div>
			</div>
		</Transition>
	);
};

export default Modal;
