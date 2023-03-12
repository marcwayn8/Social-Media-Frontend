import { Tab } from '@headlessui/react'

import { useEffect, useState, useContext } from 'react'
import AppContext from "../../context/appContext.jsx";
import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { useNavigate} from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ComplaintModal() {
    const navigate = useNavigate()
    const [complaint, setComplaints] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function createComment(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setComplaints({
          ...complaint,
          [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:4005/complaints', complaint)
            .then(response => {
                console.log(response.data);
                setComplaints(response.data);
                setOpen(false);
            })
            .catch(error => {
                console.error(`Error submitting complaint: ${error}`);
            });
    }

    function fetchLatestComplaints() {
        axios.get('http://localhost:4005/complaints')
            .then(response => {
                const latestComplaints = response.data;
                console.log(latestComplaints)
                setComplaints(latestComplaints);
            })
            .catch(error => {
                console.error(`Error getting latest complaints: ${error}`);
            });
    }

    fetchLatestComplaints()

    function handleNavigate() {
        navigate(`/main`);
    }

    return (
      <div>
        <>
            <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleOpen}
            >
                Create Complaint
            </button>
            <Modal open={open} onClose={handleClose}>
                <div className="bg-white p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" name="title" value={complaint.title} onChange={createComment} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="description" value={complaint.description} onChange={createComment} className="form-control"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Zip code:</label>
                            <input type="text" name="zipCode" value={complaint.zipCode} onChange={createComment} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Severity:</label>
                            <select name="severity" value={complaint.severity} onChange={createComment} className="form-control">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>

          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>   <button type="submit" className="btn btn-primary"  onClick={(e) => { e.preventDefault(); handleNavigate()}}>View Map</button>
      </form>
      </div>
            <div className="mt-2 flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => { e.preventDefault(); createComment(e) }}
                >
                    Submit Complaint
                </button>
            </div>
            </Modal>
            </>
            </div>
      
    )
}