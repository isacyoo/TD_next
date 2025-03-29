'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ActionConfirmModal({ currentAction, selectedAction, showModal, setShowModal, closeAndConfirm, children }) {
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Apply action</DialogTitle>
                    <DialogDescription className="my-4">
                        Are you sure you want to apply <b>{selectedAction}</b> to this video?
                        Current action is <b>{currentAction}</b>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" onClick={() => closeAndConfirm()}>
                            Apply
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}