import React from 'react'
import { useFormik } from 'formik';

const TestForm = () => {
    const formik = useFormik({
        initialValues: {
            saleDetails: {
                reasonForSelling: "",
                askingPrice: "",
              },
              teams: [{
                name: "",
                role: "",
              },
              {
                name: "",
                role: "",
              },
            ]
        },
        onSubmit: values => {
          console.log(JSON.stringify(values, null, 2));
        },
      });
  return (
          <form onSubmit={formik.handleSubmit}>
    <div>
        <div className="title">
            <span>Sale Details</span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Reason for selling</label>
                <textarea
                  type="text"
                  name="saleDetails.reasonForSelling"
                  value={formik.values.saleDetails.reasonForSelling}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Please state the reason(s) for selling this contract"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Asking Price</label>
                <input
                  min={0}
                  name="saleDetails.askingPrice"
                  value={formik.values.saleDetails.askingPrice}
                  type="number"
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Asking Price"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Team name</label>
                <input
                  type="text"
                  name="teams[0].name"
                  value={formik.values.teams[0].name}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Team Role</label>
                <input
                  type="text"
                  name="teams[0].role"
                  value={formik.values.teams[0].role}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Role"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Team name2</label>
                <input
                  type="text"
                  name="teams[1].name"
                  value={formik.values.teams[1].name}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Team Role2</label>
                <input
                  type="text"
                  name="teams[1].role"
                  value={formik.values.teams[1].role}
                  className="form-control"
                  onChange={formik.handleChange}
                  required
                  placeholder="Role"
                />
              </div>
            </div>
          </div>

          <button type='submit' className='btn-primary my-4'>Submit</button>
      
    </div>
    </form>
  )
}

export default TestForm