'use client'

import Modal from '@/components/common/Modal'
export default function ActionConfirmModal({ currentAction, selectedAction, closeAndCancel, closeAndConfirm }) {
    return (
        <Modal title='Warning!' setShowModal={closeAndCancel}>
            <ModalContent selectedAction={selectedAction} currentAction={currentAction} closeAndCancel={closeAndCancel} closeAndConfirm={closeAndConfirm}/>
        </Modal>
    )
}

function ModalContent({ selectedAction, currentAction, closeAndCancel, closeAndConfirm }) {
    return (
      <>
        <div className="relative p-6 flex-auto">
            <p className="my-4 text-primary-600 text-lg leading-relaxed">
                Are you sure you want to apply <b>{selectedAction}</b> to this video?
                Current action is <b>{currentAction}</b>
            </p>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-primary-200 rounded-b">
          <button
            className="text-primary-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => closeAndCancel()}
          >
            Close
          </button>
          <button
            className="bg-primary-600 text-primary-100 active:bg-primary-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-primary-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => closeAndConfirm()}
          >
            Apply
          </button>
        </div>
      </>
    )
}