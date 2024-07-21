'use client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Editor } from './editor/Editor';
import ActiveCollaborators from './ActiveCollaborators';
import { Input } from './ui/input';
import Image from 'next/image';

const CollaborativeRoom = ({
	roomId,
	roomMetadata,
	users,
}: // currentUserType,
CollaborativeRoomProps) => {
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLDivElement>(null);
	const updateTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {};
	const currentUserType = 'editor';
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			)
				setEditing(false);
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<RoomProvider id={roomId}>
			<ClientSideSuspense fallback={<div>Loading…</div>}>
				<div className='collaborative-room'>
					<Header>
						<div
							className='flex w-fit items-center justify-center gap-2'
							ref={containerRef}>
							{editing && !loading ? (
								<Input
									type='text'
									value={documentTitle}
									onChange={(e) => setDocumentTitle(e.target.value)}
									ref={inputRef}
									placeholder='Enter Document Title'
									onKeyDown={updateTitleHandler}
									disabled={!editing}
									className='document-title-input'
								/>
							) : (
								<>
									{' '}
									<p className='document-title'>{documentTitle}</p>
								</>
							)}
							{currentUserType !== 'editor' && !editing && (
								<Image
									src='/assets/icons/edit.svg'
									alt='edit'
									className='pointer'
									width={24}
									height={24}
									onClick={() => setEditing(true)}
								/>
							)}
							{currentUserType === 'editor' && !editing && (
								<p className='view-only-tag'>View Only</p>
							)}
							{loading && <p className='text-sm text-gray-400'>Saving...</p>}
						</div>
						<div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
							<ActiveCollaborators />
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</Header>
					<Editor />
				</div>
			</ClientSideSuspense>
		</RoomProvider>
	);
};

export default CollaborativeRoom;
