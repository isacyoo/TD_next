'use client'
export default function ActionConfirmModal({ currentAction, selectedAction, closeAndCancel, closeAndConfirm }) {
    return (
        <>
          <div
            className="fixed inset-0 flex flex-col justify-center items-center bg-primary-900 bg-opacity-50 z-50"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary-100 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-primary-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Warning!
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-primary-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeAndCancel()}
                  >
                    <span className="text-primary-900 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="my-4 text-primary-600 text-lg leading-relaxed">
                        Are you sure you want to apply {selectedAction} to this video?
                        Current action is {currentAction}
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
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )

}