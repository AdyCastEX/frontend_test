"use client";

import { useState, useEffect } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa6";

import Modal from "./modal";
import { User } from "./types/user";

export type GalleryProps = {
  users: User[];
};

const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<"name" | "company" | "email">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  // 🔁 Automatically sort whenever field or direction changes
  useEffect(() => {
    const sorted = [...users].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      if (sortField === "company") {
        aValue = a.company.name.toLowerCase();
        bValue = b.company.name.toLowerCase();
      } else {
        aValue = (a[sortField] as string).toLowerCase();
        bValue = (b[sortField] as string).toLowerCase();
      }

      const compare = aValue.localeCompare(bValue);
      return sortDirection === "asc" ? compare : -compare;
    });

    setUsersList(sorted);
  }, [users, sortField, sortDirection]);

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as "name" | "company" | "email");
  };

  const handleSortDirectionToggle = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="user-gallery">
      <div className="heading-row">
        <h1 className="heading">Users</h1>
        <div className="sort-controls">
          <label htmlFor="sortField" className="label">
            Sort by:
          </label>
          <select
            id="sortField"
            className="sort-select"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="email">Email</option>
          </select>

          <button className="sort-btn" onClick={handleSortDirectionToggle}>
            {sortDirection === "asc" ? (
              <>
                Ascending <FaArrowUp className="icon" />
              </>
            ) : (
              <>
                Descending <FaArrowDown className="icon" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="items">
        {usersList.map((user, index) => (
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
                colors={[
                  "#92A1C6",
                  "#146A7C",
                  "#F0AB3D",
                  "#C271B4",
                  "#C20D90",
                ]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
              <div className="email">{user.email}</div>
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
                    <div className="value">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="field">
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
