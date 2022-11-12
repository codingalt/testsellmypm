import React from 'react'
import { useContext } from 'react'
import { sidebarContext } from '../../../contexts/SidebarContext'
import './expertise.css'

const Expertise = ({setExpertise}) => {
    const {sortExpertise, setSortExpertise, sortByExpertise} = useContext(sidebarContext)
  return (
    <div className='sort-rel shadow border expertise-dropdown'>
        <div className="sort-items">
            <div className="s-item">
                <input value='M&A' onChange={(e)=> {setSortExpertise(e.target.value)}} type="radio" name='r1' />
                <span>M&A</span>
            </div>
            <div className="s-item">
                <input value='Valuation' onChange={(e)=> {setSortExpertise(e.target.value)}} type="radio" name='r1' />
                <span>Valuation</span>
            </div>
        </div>
        <div className="sort-items">
            <div className="s-item">
                <input value='Legal' onChange={(e)=> {setSortExpertise(e.target.value)}} type="radio" name='r1' />
                <span>Legal</span>
            </div>
            <div className="s-item">
                <input value='Escrow' onChange={(e)=> {setSortExpertise(e.target.value)}} type="radio" name='r1' />
                <span>Escrow</span>
            </div>
        </div>
        <div className="sort-items">
            <div className="s-item">
                <input value='Accounting' onChange={(e)=> {setSortExpertise(e.target.value)}} type="radio" name='r1' />
                <span>Accounting</span>
            </div>
            <div className="s-item">
                <input value='Negotiations' onChange={(e)=> {setSortExpertise(e.target.value)}} type="radio" name='r1' />
                <span>Negotiations</span>
            </div>
        </div>
        <div className="sort-items">
            <div className="s-item">
                <input value='Due Delligence' onChange={(e)=> {setSortExpertise(e.target.value)}} type="radio" name='r1' />
                <span>Due Delligence</span>
            </div>
           
        </div>
        <div className="sort-button">
            <button onClick={()=> {sortByExpertise();setExpertise(false)}} className='button'>Apply</button>
        </div>
    </div>
  )
}

export default Expertise