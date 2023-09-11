"use client";

import { useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Controls from "./controls";
import Modal from "./modal";

import { User } from "./types/user";

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSortFieldName, setSelectedSortFieldName] = useState(null);
  const [selectedSortOrientation, setSelectedSortOrientation] = useState(null);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  }; 

  const handleSortFieldName = (filter: any) => {
    setSelectedSortFieldName(filter.value)
  }

  const handleSortOrientation = (filter: any) => {
    setSelectedSortOrientation(filter.value)
  }

  const sortUsers = () => {
    const sortedUsers = [...usersList].sort((userA, userB) => {
      let valueA: string | number = "";
      let valueB: string | number = "";

      if (selectedSortFieldName === "company") {
        valueA = userA[selectedSortFieldName].name.toLowerCase();
        valueB = userB[selectedSortFieldName].name.toLowerCase();
      } else if (selectedSortFieldName === "address") {
        valueA = userA[selectedSortFieldName].city.toLowerCase();
        valueB = userB[selectedSortFieldName].city.toLowerCase();
      } else {
        valueA = userA[selectedSortFieldName];
        valueB = userB[selectedSortFieldName];
      }

      if (valueA === valueB) {
        return 0;
      }

      if (selectedSortOrientation === "ascending") {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueB < valueA ? -1 : 1;
      }
    });

    return sortedUsers;
  };

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls handleSortFieldName={handleSortFieldName} handleSortOrientation={handleSortOrientation}/>
      </div>
      <div className="items">
        {sortUsers(usersList).map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
