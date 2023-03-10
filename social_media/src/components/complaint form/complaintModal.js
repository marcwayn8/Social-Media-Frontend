import { Tab } from '@headlessui/react'
import { AtSymbolIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState,useContext } from 'react'
import AppContext from "../../context/appContext.jsx";

import Modal from '@mui/material/Modal';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ComplaintModal({ postId }) {
    const [complaint, setComplaint] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function createComment() {
        const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setComplaint({
      ...complaint,
      [name]: value,
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
    return (

     <>
             <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={complaint.title} onChange={handleInputChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={complaint.description} onChange={handleInputChange} className="form-control"></textarea>
        </div>
        <div className="form-group">
  <label>Zip code:</label>
  <input type="text" name="zipCode" value={complaint.zipCode} onChange={handleInputChange} className="form-control" />
</div>

        <div className="form-group">
          <label>Severity:</label>
          <select name="severity" value={complaint.severity} className="form-control">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  
            <div className="mt-2 flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => { e.preventDefault(); createComment() }}
                >
                    Submit Complaint
                </button>
            </div>
            </>
      
    )
}