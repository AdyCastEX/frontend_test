"use client"

import { useState, useEffect } from "react"
import Avatar from "boring-avatars"
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6"

import Controls from "./controls"
import Modal from "./modal"

import { User } from "./types/user"

export type GalleryProps = {
  users: User[]
}
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  //State Variable for sorting
  const [sortingField, setSortingField] = useState<string>("name") // default to name
  const [sortingDirection, setSortingDirection] = useState<string>("ascending") //default to ascending

  //function to sort userList
  const sortUsers = () => {
    const sortedUsers = [...usersList]

    sortedUsers.sort((a, b) => {
      const aValue = getField(a, sortingField)
      const bValue = getField(b, sortingField)

      if (sortingDirection === "ascending") {
        if (aValue < bValue) return -1
        if (aValue > bValue) return 1
        return 0
      } else {
        if (aValue > bValue) return -1
        if (aValue < bValue) return 1
        return 0
      }
    })

    setUsersList(sortedUsers)
  }

  // Function to get nested field values(company)
  const getField = (object, field) => {
    const keys = field.split(".")
    let value = object

    for (const key of keys) {
      value = value[key]
    }

    return value
  }
  //call the sortUsers func everytime sorting opt change

  useEffect(() => {
    sortUsers()
  }, [sortingField, sortingDirection])

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null

    if (user) {
      setSelectedUser(user)
      setIsModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setSelectedUser(null)
    setIsModalOpen(false)
  }

  const handleSortingChange = (field: string, direction: string) => {
    setSortingField(field)
    setSortingDirection(direction)
  }

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls onSortingChange={handleSortingChange} />
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
  )
}

export default Gallery
