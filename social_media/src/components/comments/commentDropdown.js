import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import CommentList from './commentList'
import {
    ChatBubbleLeftEllipsisIcon,
    CodeBracketIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    FlagIcon,
    HandThumbUpIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    ShareIcon,
    StarIcon,
  } from '@heroicons/react/20/solid'



const button = {
    backgroundColor: "transparent",
    height: "30",
    width: "60",
    color: "black",
    fontWeight:"40",
    marginRight: "0",
    borderColor: "transparent"
}

export default function CommentDropDown({postId}) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button style={button} >∨

                 
            </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <CommentList postId={postId}/>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}