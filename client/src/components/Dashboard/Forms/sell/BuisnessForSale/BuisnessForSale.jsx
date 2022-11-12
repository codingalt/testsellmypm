import React from 'react'
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useFormik,ErrorMessage  } from 'formik';
import Form from 'react-bootstrap/Form';
import MainContext from '../../../../Context/MainContext';
import Table from "react-bootstrap/Table";
import { toast, ToastContainer } from "react-toastify";

const BuisnessForSale = () => {
    const {categoryId} = useParams();
    const { myOwnId } = useContext(MainContext);
    const [listImages, setListImages] = useState([]);
    const [companyLogo, setCompanyLogo] = useState([]);
    const [loader, setLoader] = useState(null);

    const toastHandle = (result, message) => {
      if (result.success) {
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 11000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    const formik = useFormik({
      initialValues: {
        userId: myOwnId,
        listType: "buisnessForSell",
        categoryId: categoryId,
        images: [],
        details: {
          title: "",
          summary: "",
          location: {
            country: "",
            city: "",
            region: "",
          },
          listingUrl: "",
        },
        uniquiSellPoint: "",
        incorporationDate: "",
        companyAddress: "",
        companyNumber: "",
        website: "",
        companyLogo: [],

        teamInformation: {
          howBigIsTeam: 0,
          employees: [
            {
              name: "",
              yearsEmployed: "",
              jobTime: "",
              role: "",
              grossSalary: ""
            },
            {
              name: "",
              yearsEmployed: "",
              jobTime: "",
              role: "",
              grossSalary: ""
            },
            {
              name: "",
              yearsEmployed: "",
              jobTime: "",
              role: "",
              grossSalary: ""
            },
          
          ],
          areEmployeesOnSameContract: ""
        },

        assets: {
          isCompanyLeaseOfficeSpace: "",
          companyHasFinancialAssets: "",
          companyHasSupplyAgreements: "",
          companyHasSecureLoans: "",
          companyUseTrustAcc: "",
          companyMerchantCard: "",
          companyUseBank: ""
        },

        ownersAndProperties: {
          details: [
            {
              area: String,
              numOfProperties2022: 0,
              grossRevenuePerArea: "",
              newProperties19To22: 0,
              lostProperties19to22: 0,
              generalType: ""
            },
            {
              area: String,
              numOfProperties2022: 0,
              grossRevenuePerArea: "",
              newProperties19To22: 0,
              lostProperties19to22: 0,
              generalType: ""
            },
            {
              area: String,
              numOfProperties2022: 0,
              grossRevenuePerArea: "",
              newProperties19To22: 0,
              lostProperties19to22: 0,
              generalType: ""
            },
           
          ],
          ownerHaveSameContract: "",
          terminationClauses: "",
          howRenewed: "",
          agreeOnYearlyTerm: "",
          customerAquisitionCost: 0,
          avgNetProfitEachProperty: 0,

          typesOfRentedProperties: {
            cottages: {
              numOfProperties: 0,
              grossBookingValue: 0,
              netProfitPerGroup: 0,
          },
          houses: {
              numOfProperties: 0,
              grossBookingValue: 0,
              netProfitPerGroup: 0,
          },
          appartments: {
              numOfProperties: 0,
              grossBookingValue: 0,
              netProfitPerGroup: 0,
          },
          logLodges: {
              numOfProperties: 0,
              grossBookingValue: 0,
              netProfitPerGroup: 0,
          },
          prods: {
              numOfProperties: 0,
              grossBookingValue: 0,
              netProfitPerGroup: 0,
          },
          }
        },

        baseBuisnessModal: {
          howPropertiesContracted: "",
          howCheckOrganised: "",
          companyOperateStdCommission: "",

          commissionStructure: {
              isVaryByProperty: "",
              isAnyBookingFees: "",
              isListingFeesonTopCommission: "",
              isAdditionalExtras: "",
              isCompanyUseDeposit: "",
              isCompanyTakeDamageDeposit: "",
              whenOwnersPaid: ""
          },
          isCompanyOperateLease: "",
          chargebackExperienced: "",
          anyFinancialInstruments: "",
          whoSuppliesPms: "",
          pmsCommercialTerms: "",
        },

        propertyOnboarding: {
          isStandardOnboarding: "",
          doYouUseExternalHelp: "",
          ownerChargedOnboardingFee: "",
          copyrightRetention: "",
          ownerCanOperationalManagment: "",
          premeetOwnerSales: "",
          companyOfferAssociatedServices: "",
          ownerHaveSayInPricing: "",
          ownerApproveLiveListing: "",
          ownerAskedToAdoptEntrySystem: "",
          staffMemberUploadProperty: "",
          ChannelsSupported: "",
          cardCharges: "",
          howPropertyAdded: "",
          manualActionsOnWebsite: "",
          arePropertiesDynamicPricing: "",
          whcihCommercialTerms: "",
          anyManualActions: "",
      },

      booking: {
        details: {
        directBookingOnWebsite: "",
        directBookingByCard: "",
        directBookingOverPhone: "",
        airBnb: "",
        vrbo: "",
        bookingcom: "",
        tripAdvisor: "",
        otherOta: "",
        overThePhone: "",
        },

        makeupOfBooking: {
            totalBookings: [{
                year19: 0,
                year20: 0,
                year21: 0,
                year22: 0,
            }],
            avgNightBookedPerYear: [{
                year19: 0,
                year20: 0,
                year21: 0,
                year22: 0,
            }],
            customerPercentageRepeatBooking: [{
                year19: 0,
                year20: 0,
                year21: 0,
                year22: 0,
            }],
            percentGuestCancel: [{
                year19: 0,
                year20: 0,
                year21: 0,
                year22: 0,
            }],
            avgAdvanceBookingWindow: [{
                year19: 0,
                year20: 0,
                year21: 0,
                year22: 0,
            }],
            avgAdr: [{
                year19: 0,
                year20: 0,
                year21: 0,
                year22: 0,
            }],
            avgStayTimes: [{
                year19: 0,
                year20: 0,
                year21: 0,
                year22: 0,
            }],
        },
        anySignificantDiff: "",
    },

    guests: {
      automationMessaging: "",
      automationMessagingForPayment: "",
      automatedInfoOnLocation: "",
      guestAppLink: "",
      mailedPaperwork: "",
      preArrivalInfo: "",
      inStayMessages: "",
      postAutomatedMessages: "",
      personalPhoneCalls: "",
      personalRepeatMarketing: "",
      guestHaveAccessToLogin: "",
      guestHaveAccessToMobApp: "",
  },

    ownerReporting: {
      ownerReceiveRegularStatement: "",
      areTailored: "",
      doBookingShowDetails: "",
      doOwnerHaveSeperateLogin: "",
      },

      companyReporting: {
        reportsOnBooking: "",
        reportsOnBalances: "",
        paymentReports: "",
        bookingGraphicalRepresentation: "",
        bookingSplits: "",
        reconciliationReports: "",
    },

    marketing: {
      companyUseCrm: "",
      companyUndertakeMailer: "",
      directMarketingResponseRate: "",
      companyActivelyMarket: "",
      incomeSpentOnMarketing: "",
      marketingActivityUndertaken: "",
      isPrUsed: "",

      siteAnalysisTools: {
          trafficAnalysis: "",
          heatMaps: "",
          userTracking: "",
          keywordAnalysis: "",
          isPpcAdvertismentUsed: ""
      }
    },

    metrics: {
      webTraffic: "",
      comparativeBooking: "",
      marginsOnBooking: "",
      npsWithGuest: "",
      reviewsOnWeb: "",
      companyProfitability: "",
      staffRetention: "",
      personalSatisfaction: "",
      competitiveAnalysis: "",
      other: "",
  },

  companyAcquisition :{
    companyProfit: "",
    howStableContracts: "",
    growthCurve: "",
    staffCost: "",
    hotSpottingProperty: "",
    propertyTypeFocus: "",
    easeOfTransition: "",
    clarity: "",
    directBuisness: "",
    brandStrength: "",
    directors: "",
    arrangmentsForCleaning: "",
},

        rentalKpis: {
          avgBookingValue: 0,
          avgOccupancyRate: 0,
          monthsLeftOnContract: 0,
          monthsUnderYourControl: 0,
        },

        saleDetails: {
          reasonForSelling: "",
          askingPrice: "",
          specificPrice: "",
          quickSaleNeed: ""
        },

        propertyDetails: {
          maintenanceIssues: "",
          ownerIssues: "",
          stopRentingReason: "",
        },
      },
      onSubmit: values => {
        // console.log(JSON.stringify(values, null, 2));
        const postData = async () => {
          setLoader(true);
          const res = await fetch(`/listing/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values,null,2),
          });
          const data = await res.json();
          console.log(data);
        toastHandle(data, data.message);
          setLoader(false);
        formik.resetForm();
        };
        postData();
      },
    
    });
    
    const imageHandler = (e)=>{
      const files = Array.from(e.target.files);
      files.forEach((file)=>{
        const reader = new FileReader();
  
        reader.onload = ()=>{
          if(reader.readyState === 2){
            setListImages((prev)=> [...prev, reader.result])
            formik.values.images.push(reader.result)
          }
        }
  
        reader.readAsDataURL(file);
      })
    }

    const logoHandler = (e)=>{
      const files = Array.from(e.target.files);
      console.log(files);
      files.forEach((file)=>{
        const reader = new FileReader();
  
        reader.onload = ()=>{
          if(reader.readyState === 2){
            setCompanyLogo((prev)=> [...prev, reader.result])
            formik.values.companyLogo.push(reader.result)
          }
        }
  
        reader.readAsDataURL(file);
      })
    }
  
    return (
      <div className="listing-contract">
        <ToastContainer />
       
        <div className="card border shadow-sm rounded">
          <div className="heading">Create a Buisness For Sell Listing</div>
          <form onSubmit={formik.handleSubmit}>
          <div className="title">
              <span>Advert Details</span>
              <p className='advert-detail'>We’re going to help you create an appealing advert which will encourage interested parties to get in touch. </p>
            </div>
            <div className="title">
              <span>Basic Information</span>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Listing Headline</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    name='details.title'
                    value={formik.values.details.title}
                    placeholder="This will appear as the main headline for your listing. For example, Contract in East London, Hackney"
                  />
                
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>General Summary</label>
                  <textarea
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    rows={7}
                    name="details.summary"
                    value={formik.values.details.summary}
                    placeholder="Highlight the selling points of the business for sale. Say as much or as little as you want. Please do not add phone numbers or email addresses to the description."
                  />
                  
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>What is your unique selling point</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    name='uniquiSellPoint'
                    value={formik.values.uniquiSellPoint}
                    placeholder="Unique Selling point"
                  />
                
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    name='website'
                    value={formik.values.website}
                    placeholder="website"
                  />
                
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Incorporation Date</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    name='incorporationDate'
                    value={formik.values.incorporationDate}
                    placeholder="E.g: 20-04-2022"
                  />
                
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Company address</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    name='companyAddress'
                    value={formik.values.companyAddress}
                    placeholder="Company address"
                  />
                
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Company Number</label>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    name='companyNumber'
                    value={formik.values.companyNumber}
                    placeholder="Company number"
                  />
                
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
              <div className="">
                <label>Company Logo</label>
                <input
                  name="companyLogo"
                  type="file"
                  className="mt-3"
                  onChange={logoHandler}
                  required
                  accept="image/*"
                  style={{display:'flex',alignItems:'center'}}
                />
              </div>
            </div>
          </div>
  
            <div className="title">
              <span>Location</span>
            </div>
  
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="details.location.country"
                    value={formik.values.details.location.country}
                    className="form-control"
                    required
                    onChange={formik.handleChange}
                    placeholder="Enter the country where your Listing Contract is Located"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Region</label>
                  <input
                    type="text"
                    name="details.location.region"
                    value={formik.values.details.location.region}
                    className="form-control"
                    required
                    onChange={formik.handleChange}
                    placeholder="Region"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>City / Town</label>
                  <input
                    type="text"
                    name="details.location.city"
                    value={formik.values.details.location.city}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="City / Town"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Listing Url</label>
                  <input
                    type="text"
                    name="details.listingUrl"
                    value={formik.values.details.listingUrl}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Listing Url"
                  />
                </div>
              </div>
            </div>
  
            <div className="title">
              <span>Short-term Rental KPIs</span>
            </div>
            <div className="row short-term-kpi">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Average Booking Value</label>
                  <input
                    min={0}
                    name="rentalKpis.avgBookingValue"
                    value={formik.values.rentalKpis.avgBookingValue}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Average Booking Value"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Average Occupancy Rate</label>
                  <input
                    min={0}
                    name="rentalKpis.avgOccupancyRate"
                    value={formik.values.rentalKpis.avgOccupancyRate}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Average Occupancy Rate"
                  />
                </div>
              </div>
            </div>
            <div className="row short-term-kpi">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Months left on Contract</label>
                  <input
                    min={0}
                    name="rentalKpis.monthsLeftOnContract"
                    value={formik.values.rentalKpis.monthsLeftOnContract}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Months left on Contract"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Months Under your Control</label>
                  <input
                    min={0}
                    name="rentalKpis.monthsUnderYourControl"
                    value={formik.values.rentalKpis.monthsUnderYourControl}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Months Under your Control"
                  />
                </div>
              </div>
            </div>
  
  
            <div className="title">
              <span>Sale Details</span>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Reason for selling</label>
                  <Form.Select size="lg" name='saleDetails.reasonForSelling' onChange={formik.handleChange} value={formik.values.saleDetails.reasonForSelling}>
                    <option>Capitalisation (Pull out your capital after your hard work)</option>
                    <option>Poor Performance (owning a business that is struggling is no fun)</option>
                    <option>Relocation required (sell and move on)</option>
                    <option>Retirement</option>
                    <option>Ill Health</option>
                    <option>New opportunities identified</option>
                    <option>Business in demand</option>
                  </Form.Select>
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
                  <label>Specific Price</label>
                  <input
                    min={0}
                    name="saleDetails.specificPrice"
                    value={formik.values.saleDetails.specificPrice}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Specific Price"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Quick Sale Needed</label>
                  <Form.Select size='lg' name='saleDetails.quickSaleNeed' onChange={formik.handleChange} value={formik.values.saleDetails.quickSaleNeed}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="title">
              <span>Team Information</span>
              <p className='advert-detail'>Team are generally the biggest expense and always a consideration in acquisition, saving costs and driving the business forward.</p>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>How Big is Your Team</label>
                  <input
                    min={0}
                    name="teamInformation.howBigIsTeam"
                    value={formik.values.teamInformation.howBigIsTeam}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="How big is team"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are all employees on the same type of contract and termination clauses? </label>
                  <Form.Select size='lg' name='teamInformation.areEmployeesOnSameContract' onChange={formik.handleChange} value={formik.values.teamInformation.areEmployeesOnSameContract}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="sub-title">
              <span>Employee Details</span>
            </div>
           <div className="row">
              <div className="col-md-2">
                <div className="form-group">
                  <label>Employee Name</label>
                  <input
                    name="teamInformation.employees[0].name"
                    value={formik.values.teamInformation.employees[0].name}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Years Employed</label>
                  <input
                    min={0}
                    name="teamInformation.employees[0].yearsEmployed"
                    value={formik.values.teamInformation.employees[0].yearsEmployed}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Year"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Job Time</label>
                  <input
                    name="teamInformation.employees[0].jobTime"
                    value={formik.values.teamInformation.employees[0].jobTime}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Job Time"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Role</label>
                  <input
                    name="teamInformation.employees[0].role"
                    value={formik.values.teamInformation.employees[0].role}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Role"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Gross Salary</label>
                  <input
                    name="teamInformation.employees[0].grossSalary"
                    value={formik.values.teamInformation.employees[0].grossSalary}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Salary"
                  />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-md-2">
                <div className="form-group">
                  <label>Employee Name</label>
                  <input
                    name="teamInformation.employees[1].name"
                    value={formik.values.teamInformation.employees[1].name}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Years Employed</label>
                  <input
                    min={0}
                    name="teamInformation.employees[1].yearsEmployed"
                    value={formik.values.teamInformation.employees[1].yearsEmployed}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Year"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Job Time</label>
                  <input
                    name="teamInformation.employees[1].jobTime"
                    value={formik.values.teamInformation.employees[1].jobTime}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Job Time"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Role</label>
                  <input
                    name="teamInformation.employees[1].role"
                    value={formik.values.teamInformation.employees[1].role}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Role"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Gross Salary</label>
                  <input
                    name="teamInformation.employees[1].grossSalary"
                    value={formik.values.teamInformation.employees[1].grossSalary}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Salary"
                  />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-md-2">
                <div className="form-group">
                  <label>Employee Name</label>
                  <input
                    name="teamInformation.employees[2].name"
                    value={formik.values.teamInformation.employees[2].name}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Years Employed</label>
                  <input
                    min={0}
                    name="teamInformation.employees[2].yearsEmployed"
                    value={formik.values.teamInformation.employees[2].yearsEmployed}
                    type="number"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Year"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Job Time</label>
                  <input
                    name="teamInformation.employees[2].jobTime"
                    value={formik.values.teamInformation.employees[2].jobTime}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Job Time"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Role</label>
                  <input
                    name="teamInformation.employees[2].role"
                    value={formik.values.teamInformation.employees[2].role}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Role"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label>Gross Salary</label>
                  <input
                    name="teamInformation.employees[2].grossSalary"
                    value={formik.values.teamInformation.employees[2].grossSalary}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Salary"
                  />
                </div>
              </div>

            </div>

            <div className="title">
              <span>Assets and Liabilities</span>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company lease office space? </label>
                  <Form.Select size='lg' name='assets.isCompanyLeaseOfficeSpace' onChange={formik.handleChange} value={formik.values.assets.isCompanyLeaseOfficeSpace}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company have associated financial liabilities, such as leases on equipment, long term phone, car contracts etc?  </label>
                  <Form.Select size='lg' name='assets.companyHasFinancialAssets' onChange={formik.handleChange} value={formik.values.assets.companyHasFinancialAssets}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company have longer term supply agreements with any business for any activity such as laundry? </label>
                  <Form.Select size='lg' name='assets.companyHasSupplyAgreements' onChange={formik.handleChange} value={formik.values.assets.companyHasSupplyAgreements}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company have secured loans over the business or debentures of any nature</label>
                  <Form.Select size='lg' name='assets.companyHasSecureLoans' onChange={formik.handleChange} value={formik.values.assets.companyHasSecureLoans}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company use a trust account for booking income and a separate one for commissions or fees? </label>
                  <Form.Select size='lg' name='assets.companyUseTrustAcc' onChange={formik.handleChange} value={formik.values.assets.companyUseTrustAcc}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Which merchant card processor does the company use? </label>
                  <Form.Select size='lg' name='assets.companyMerchantCard' onChange={formik.handleChange} value={formik.values.assets.companyMerchantCard}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Which bank does the company use?  </label>
                  <input
                    name="assets.companyUseBank"
                    value={formik.values.assets.companyUseBank}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Bank"
                  />
                
                </div>
              </div>
            </div>

            <div className="title">
              <span>Owners & Properties</span>
              <p className='advert-detail'>Most acquisitions are for growth purposes, creating efficiencies, reducing competition, and increasing investment opportunities. Brand growth and PR associated with acquisitions are a consideration too.</p>
            </div>
            <div className="sub-title">
              <span>Details 1</span>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Area </label>
                  <input
                    name="ownersAndProperties.details[0].area"
                    value={formik.values.ownersAndProperties.details[0].area}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Area"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Number of Properties 2022 </label>
                  <input
                    name="ownersAndProperties.details[0].numOfProperties2022"
                    value={formik.values.ownersAndProperties.details[0].numOfProperties2022}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross Revenue per area</label>
                  <input
                    name="ownersAndProperties.details[0].grossRevenuePerArea"
                    value={formik.values.ownersAndProperties.details[0].grossRevenuePerArea}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

              </div>
              <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>New Properties 2019 to 2022</label>
                  <input
                    name="ownersAndProperties.details[0].newProperties19To22"
                    value={formik.values.ownersAndProperties.details[0].newProperties19To22}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Lost Properties 2019 to 2022</label>
                  <input
                    name="ownersAndProperties.details[0].lostProperties19to22"
                    value={formik.values.ownersAndProperties.details[0].lostProperties19to22}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>General type Urban or Leisure</label>
                  <input
                    name="ownersAndProperties.details[0].generalType"
                    value={formik.values.ownersAndProperties.details[0].generalType}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>Details 2</span>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Area </label>
                  <input
                    name="ownersAndProperties.details[1].area"
                    value={formik.values.ownersAndProperties.details[1].area}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Area"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Number of Properties 2022 </label>
                  <input
                    name="ownersAndProperties.details[1].numOfProperties2022"
                    value={formik.values.ownersAndProperties.details[1].numOfProperties2022}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross Revenue per area</label>
                  <input
                    name="ownersAndProperties.details[1].grossRevenuePerArea"
                    value={formik.values.ownersAndProperties.details[1].grossRevenuePerArea}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

              </div>
              <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>New Properties 2019 to 2022</label>
                  <input
                    name="ownersAndProperties.details[1].newProperties19To22"
                    value={formik.values.ownersAndProperties.details[1].newProperties19To22}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Lost Properties 2019 to 2022</label>
                  <input
                    name="ownersAndProperties.details[1].lostProperties19to22"
                    value={formik.values.ownersAndProperties.details[1].lostProperties19to22}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>General type Urban or Leisure</label>
                  <input
                    name="ownersAndProperties.details[1].generalType"
                    value={formik.values.ownersAndProperties.details[1].generalType}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>Details 3</span>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Area </label>
                  <input
                    name="ownersAndProperties.details[2].area"
                    value={formik.values.ownersAndProperties.details[2].area}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Area"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Number of Properties 2022 </label>
                  <input
                    name="ownersAndProperties.details[2].numOfProperties2022"
                    value={formik.values.ownersAndProperties.details[2].numOfProperties2022}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross Revenue per area</label>
                  <input
                    name="ownersAndProperties.details[2].grossRevenuePerArea"
                    value={formik.values.ownersAndProperties.details[2].grossRevenuePerArea}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

              </div>
              <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>New Properties 2019 to 2022</label>
                  <input
                    name="ownersAndProperties.details[2].newProperties19To22"
                    value={formik.values.ownersAndProperties.details[2].newProperties19To22}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Lost Properties 2019 to 2022</label>
                  <input
                    name="ownersAndProperties.details[2].lostProperties19to22"
                    value={formik.values.ownersAndProperties.details[2].lostProperties19to22}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>General type Urban or Leisure</label>
                  <input
                    name="ownersAndProperties.details[2].generalType"
                    value={formik.values.ownersAndProperties.details[2].generalType}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do all Owners have the same contracts?  </label>
                  <Form.Select size='lg' name='ownersAndProperties.ownerHaveSameContract' onChange={formik.handleChange} value={formik.values.ownersAndProperties.ownerHaveSameContract}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>What are the termination clauses?   </label>
                  <Form.Select size='lg' name='ownersAndProperties.terminationClauses' onChange={formik.handleChange} value={formik.values.ownersAndProperties.terminationClauses}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are they renewed yearly actively or by default?  </label>
                  <Form.Select size='lg' name='ownersAndProperties.howRenewed' onChange={formik.handleChange} value={formik.values.ownersAndProperties.howRenewed}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do you need to agree any yearly terms with owners such as pricing?   </label>
                  <Form.Select size='lg' name='ownersAndProperties.agreeOnYearlyTerm' onChange={formik.handleChange} value={formik.values.ownersAndProperties.agreeOnYearlyTerm}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>What is your customer acquisition cost for properties?  </label>
                  <input
                    name="ownersAndProperties.customerAquisitionCost"
                    value={formik.values.ownersAndProperties.customerAquisitionCost}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>What is the average net profit for each property?  </label>
                  <input
                    name="ownersAndProperties.avgNetProfitEachProperty"
                    value={formik.values.ownersAndProperties.avgNetProfitEachProperty}
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="title">
              <span>What types of properties are rented and what is their contribution to the business?</span>
            </div>
            <div className="sub-title">
              <span>Types Of Properties</span>
            </div>
            <div className="sub-title">
              <span>Cottages</span>
            </div>
            <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                  <label>Number Of Properties </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.cottages.numOfProperties"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.cottages.numOfProperties}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross booking value </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.cottages.grossBookingValue"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.cottages.grossBookingValue}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Net profit per group</label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.cottages.netProfitPerGroup"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.cottages.netProfitPerGroup}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>Houses</span>
            </div>
            <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                  <label>Number Of Properties </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.houses.numOfProperties"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.houses.numOfProperties}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross booking value </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.houses.grossBookingValue"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.houses.grossBookingValue}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Net profit per group</label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.houses.netProfitPerGroup"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.houses.netProfitPerGroup}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>Apartments</span>
            </div>
            <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                  <label>Number Of Properties </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.appartments.numOfProperties"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.appartments.numOfProperties}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross booking value </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.appartments.grossBookingValue"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.appartments.grossBookingValue}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Net profit per group</label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.appartments.netProfitPerGroup"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.appartments.netProfitPerGroup}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>Log Lodges</span>
            </div>
            <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                  <label>Number Of Properties </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.logLodges.numOfProperties"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.logLodges.numOfProperties}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross booking value </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.logLodges.grossBookingValue"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.logLodges.grossBookingValue}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Net profit per group</label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.logLodges.netProfitPerGroup"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.logLodges.netProfitPerGroup}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>Pods/Huts/other</span>
            </div>
            <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                  <label>Number Of Properties </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.prods.numOfProperties"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.prods.numOfProperties}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Gross booking value </label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.prods.grossBookingValue"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.prods.grossBookingValue}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Net profit per group</label>
                  <input
                    name="ownersAndProperties.typesOfRentedProperties.prods.netProfitPerGroup"
                    value={formik.values.ownersAndProperties.typesOfRentedProperties.prods.netProfitPerGroup}
                    type="number"
                    min={0}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>

            <div className="title">
              <span>Base Buisness Model</span>
              <p className='advert-detail'>No one PM has the same business model and an acquirer will invariably try to convert it to theirs technically, commercially and with owner contracts for consistency.</p>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>How are your properties contracted? </label>
                  <Form.Select size='lg' name='baseBuisnessModal.howPropertiesContracted' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.howPropertiesContracted}>
                    <option value="Exclusive">Exclusive</option>
                    <option value="Non Exclusive">Non Exclusive</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>How are your cleaning and check in operations organised?  </label>
                  <Form.Select size='lg' name='baseBuisnessModal.howCheckOrganised' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.howCheckOrganised}>
                    <option value="Agency">Agency</option>
                    <option value="Employed">Employed</option>
                    <option value="Non Employed">Non Employed</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company operate a standard commission from each booking approach?  </label>
                  <Form.Select size='lg' name='baseBuisnessModal.companyOperateStdCommission' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.companyOperateStdCommission}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="sub-title">
              <span>Commission Structure</span>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does it vary by property or owners? </label>
                  <Form.Select size='lg' name='baseBuisnessModal.commissionStructure.isVaryByProperty' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.commissionStructure.isVaryByProperty}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are there any booking fees?  </label>
                  <Form.Select size='lg' name='baseBuisnessModal.commissionStructure.isAnyBookingFees' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.commissionStructure.isAnyBookingFees}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are there listing fees on top of commissions?  </label>
                  <Form.Select size='lg' name='baseBuisnessModal.commissionStructure.isListingFeesonTopCommission' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.commissionStructure.isListingFeesonTopCommission}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are there any additional extras or insurance cover for damage or travel issues?   </label>
                  <Form.Select size='lg' name='baseBuisnessModal.commissionStructure.isAdditionalExtras' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.commissionStructure.isAdditionalExtras}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company use a deposit and balance model with X days prior to arrival?  </label>
                  <Form.Select size='lg' name='baseBuisnessModal.commissionStructure.isCompanyUseDeposit' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.commissionStructure.isCompanyUseDeposit}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company take refundable damage deposits?   </label>
                  <Form.Select size='lg' name='baseBuisnessModal.commissionStructure.isCompanyTakeDamageDeposit' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.commissionStructure.isCompanyTakeDamageDeposit}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>When are the owners paid  </label>
                  <Form.Select size='lg' name='baseBuisnessModal.commissionStructure.whenOwnersPaid' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.commissionStructure.whenOwnersPaid}>
                    <option value='Upon receipt of the deposit'>Upon receipt of the deposit</option>
                    <option value='Upon receipt of the deposit and balance'>Upon receipt of the deposit and balance</option>
                    <option value="After the guest has arrived">After the guest has arrived</option>
                    <option value="After the guest has left">After the guest has left</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company operate a lease, rent to rent arbitrage model on any properties?  </label>
                  <Form.Select size='lg' name='baseBuisnessModal.isCompanyOperateLease' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.isCompanyOperateLease}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>What level of chargebacks has the company experienced over the last 3 years?  </label>
                  <textarea
                    type="text"
                    name="baseBuisnessModal.chargebackExperienced"
                    value={formik.values.baseBuisnessModal.chargebackExperienced}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are there any other financial instruments used to book properties from owners or lessees? </label>
                  <Form.Select size='lg' name='baseBuisnessModal.anyFinancialInstruments' onChange={formik.handleChange} value={formik.values.baseBuisnessModal.anyFinancialInstruments}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Who supplies the PMS system?  </label>
                  <textarea
                    type="text"
                    name="baseBuisnessModal.whoSuppliesPms"
                    value={formik.values.baseBuisnessModal.whoSuppliesPms}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>What are the commercial terms with your PMS? </label>
                  <textarea
                    type="text"
                    name="baseBuisnessModal.pmsCommercialTerms"
                    value={formik.values.baseBuisnessModal.pmsCommercialTerms}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="title">
              <span>Property Onboarding</span>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Is there a standard onboarding procedure for a new property?  </label>
                  <Form.Select size='lg' name='propertyOnboarding.isStandardOnboarding' onChange={formik.handleChange} value={formik.values.propertyOnboarding.isStandardOnboarding}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do you use external help (e.g. photography, descriptions, interior assistance etc?) </label>
                  <Form.Select size='lg' name='propertyOnboarding.doYouUseExternalHelp' onChange={formik.handleChange} value={formik.values.propertyOnboarding.doYouUseExternalHelp}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label> Is the owner charged an onboarding fee?  </label>
                  <Form.Select size='lg' name='propertyOnboarding.ownerChargedOnboardingFee' onChange={formik.handleChange} value={formik.values.propertyOnboarding.ownerChargedOnboardingFee}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label> Are there copyright retention on photographs?   </label>
                  <Form.Select size='lg' name='propertyOnboarding.copyrightRetention' onChange={formik.handleChange} value={formik.values.propertyOnboarding.copyrightRetention}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label> Is the owner given an option on operational management (ie they can choose to do it themselves or will let the company organise it)?    </label>
                  <Form.Select size='lg' name='propertyOnboarding.ownerCanOperationalManagment' onChange={formik.handleChange} value={formik.values.propertyOnboarding.ownerCanOperationalManagment}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are there pre-meet owner sales collateral pieces, print or pdf? </label>
                  <Form.Select size='lg' name='propertyOnboarding.premeetOwnerSales' onChange={formik.handleChange} value={formik.values.propertyOnboarding.premeetOwnerSales}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company offer associated services e.g. Interior design? </label>
                  <Form.Select size='lg' name='propertyOnboarding.companyOfferAssociatedServices' onChange={formik.handleChange} value={formik.values.propertyOnboarding.companyOfferAssociatedServices}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the owner have a say in the pricing, descriptions, photography, which OTAs or anything else?  </label>
                  <Form.Select size='lg' name='propertyOnboarding.ownerHaveSayInPricing' onChange={formik.handleChange} value={formik.values.propertyOnboarding.ownerHaveSayInPricing}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label> Does the owner need to approve a live listing?  </label>
                  <Form.Select size='lg' name='propertyOnboarding.ownerApproveLiveListing' onChange={formik.handleChange} value={formik.values.propertyOnboarding.ownerApproveLiveListing}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label> Are the owners asked to adopt a particular key entry system e.g.Keyboxes, keyless entry etc?   </label>
                  <Form.Select size='lg' name='propertyOnboarding.ownerAskedToAdoptEntrySystem' onChange={formik.handleChange} value={formik.values.propertyOnboarding.ownerAskedToAdoptEntrySystem}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does a staff member upload the property, set pricing, terms etc?  </label>
                  <Form.Select size='lg' name='propertyOnboarding.staffMemberUploadProperty' onChange={formik.handleChange} value={formik.values.propertyOnboarding.staffMemberUploadProperty}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Which distribution channels are supported?</label>
                  <textarea
                    type="text"
                    name="propertyOnboarding.ChannelsSupported"
                    value={formik.values.propertyOnboarding.ChannelsSupported}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are channel (OTA) tariff prices uplifted by the commission charged (plus any VAT or card charges)?  </label>
                  <Form.Select size='lg' name='propertyOnboarding.cardCharges' onChange={formik.handleChange} value={formik.values.propertyOnboarding.cardCharges}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Is there a need to manually add the property to the website or is it all dynamically generated from the PMS?   </label>
                  <Form.Select size='lg' name='propertyOnboarding.howPropertyAdded' onChange={formik.handleChange} value={formik.values.propertyOnboarding.howPropertyAdded}>
                    <option value="dynamic">Dynamic</option>
                    <option value="manual">Manual</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are there any manual actions on the website e.g. SEO such as metatags or H1 titles for each property?   </label>
                  <Form.Select size='lg' name='propertyOnboarding.manualActionsOnWebsite' onChange={formik.handleChange} value={formik.values.propertyOnboarding.manualActionsOnWebsite}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are all properties using dynamic pricing?    </label>
                  <Form.Select size='lg' name='propertyOnboarding.arePropertiesDynamicPricing' onChange={formik.handleChange} value={formik.values.propertyOnboarding.arePropertiesDynamicPricing}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>If so, which company and commercial terms?</label>
                  <textarea
                    type="text"
                    name="propertyOnboarding.whcihCommercialTerms"
                    value={formik.values.propertyOnboarding.whcihCommercialTerms}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are there any other manual actions required with a property prior to going live?  </label>
                  <Form.Select size='lg' name='propertyOnboarding.anyManualActions' onChange={formik.handleChange} value={formik.values.propertyOnboarding.anyManualActions}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="title">
              <span>Bookings</span>
              <p className='advert-detail'>Booking can be generated in many different ways.</p>
            </div>
            <div className="sub-title">
              <span>Booking Channel</span>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Direct bookings on your website</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.directBookingOnWebsite"
                    value={formik.values.booking.details.directBookingOnWebsite}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Direct bookings by card or wire transfer</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.directBookingByCard"
                    value={formik.values.booking.details.directBookingByCard}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Direct bookings over the phone (not enquiries)</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.directBookingOverPhone"
                    value={formik.values.booking.details.directBookingOverPhone}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Airbnb</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.airBnb"
                    value={formik.values.booking.details.airBnb}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>VRBO</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.vrbo"
                    value={formik.values.booking.details.vrbo}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Booking.com</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.bookingcom"
                    value={formik.values.booking.details.bookingcom}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>TripAdvisor</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.tripAdvisor"
                    value={formik.values.booking.details.tripAdvisor}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Other OTA</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.otherOta"
                    value={formik.values.booking.details.otherOta}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Over the phone</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.details.overThePhone"
                    value={formik.values.booking.details.overThePhone}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='% of Bookings'
                  />
                </div>
              </div>
            </div>
            <div className="title">
              <span>Make up of bookings</span>
            </div>
            <div className="sub-title">
              <span>Total # of bookings</span>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>2019</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.totalBookings[0].year19"
                    value={formik.values.booking.makeupOfBooking.totalBookings[0].year19}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2020</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.totalBookings[0].year20"
                    value={formik.values.booking.makeupOfBooking.totalBookings[0].year20}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2021</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.totalBookings[0].year21"
                    value={formik.values.booking.makeupOfBooking.totalBookings[0].year21}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2022</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.totalBookings[0].year22"
                    value={formik.values.booking.makeupOfBooking.totalBookings[0].year22}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>Average number of nights booked per property</span>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>2019</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgNightBookedPerYear[0].year19"
                    value={formik.values.booking.makeupOfBooking.avgNightBookedPerYear[0].year19}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2020</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgNightBookedPerYear[0].year20"
                    value={formik.values.booking.makeupOfBooking.avgNightBookedPerYear[0].year20}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2021</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgNightBookedPerYear[0].year21"
                    value={formik.values.booking.makeupOfBooking.avgNightBookedPerYear[0].year21}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2022</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgNightBookedPerYear[0].year22"
                    value={formik.values.booking.makeupOfBooking.avgNightBookedPerYear[0].year22}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>% of customers that are repeat bookings</span>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>2019</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.customerPercentageRepeatBooking[0].year19"
                    value={formik.values.booking.makeupOfBooking.customerPercentageRepeatBooking[0].year19}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2020</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.customerPercentageRepeatBooking[0].year20"
                    value={formik.values.booking.makeupOfBooking.customerPercentageRepeatBooking[0].year20}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2021</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.customerPercentageRepeatBooking[0].year21"
                    value={formik.values.booking.makeupOfBooking.customerPercentageRepeatBooking[0].year21}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2022</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.customerPercentageRepeatBooking[0].year22"
                    value={formik.values.booking.makeupOfBooking.customerPercentageRepeatBooking[0].year22}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>What % of guests cancel?</span>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>2019</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.percentGuestCancel[0].year19"
                    value={formik.values.booking.makeupOfBooking.percentGuestCancel[0].year19}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2020</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.percentGuestCancel[0].year20"
                    value={formik.values.booking.makeupOfBooking.percentGuestCancel[0].year20}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2021</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.percentGuestCancel[0].year21"
                    value={formik.values.booking.makeupOfBooking.percentGuestCancel[0].year21}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2022</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.percentGuestCancel[0].year22"
                    value={formik.values.booking.makeupOfBooking.percentGuestCancel[0].year22}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>What was the average advance booking window?</span>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>2019</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdvanceBookingWindow[0].year19"
                    value={formik.values.booking.makeupOfBooking.avgAdvanceBookingWindow[0].year19}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2020</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdvanceBookingWindow[0].year20"
                    value={formik.values.booking.makeupOfBooking.avgAdvanceBookingWindow[0].year20}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2021</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdvanceBookingWindow[0].year21"
                    value={formik.values.booking.makeupOfBooking.avgAdvanceBookingWindow[0].year21}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2022</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdvanceBookingWindow[0].year22"
                    value={formik.values.booking.makeupOfBooking.avgAdvanceBookingWindow[0].year22}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>What is the average ADR?</span>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>2019</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdr[0].year19"
                    value={formik.values.booking.makeupOfBooking.avgAdr[0].year19}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2020</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdr[0].year20"
                    value={formik.values.booking.makeupOfBooking.avgAdr[0].year20}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2021</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdr[0].year21"
                    value={formik.values.booking.makeupOfBooking.avgAdr[0].year21}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2022</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgAdr[0].year22"
                    value={formik.values.booking.makeupOfBooking.avgAdr[0].year22}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="sub-title">
              <span>What are the average stay times?</span>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>2019</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgStayTimes[0].year19"
                    value={formik.values.booking.makeupOfBooking.avgStayTimes[0].year19}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2020</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgStayTimes[0].year20"
                    value={formik.values.booking.makeupOfBooking.avgStayTimes[0].year20}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2021</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgStayTimes[0].year21"
                    value={formik.values.booking.makeupOfBooking.avgStayTimes[0].year21}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>2022</label>
                  <input
                    type="number"
                    min={0}
                    name="booking.makeupOfBooking.avgStayTimes[0].year22"
                    value={formik.values.booking.makeupOfBooking.avgStayTimes[0].year22}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label> Are there significant differences in the bookings by OTA/Property type or location. i.e. Booking is mainly urban apartments, Trip is Lodges etc?  </label>
                  <Form.Select size='lg' name='booking.anySignificantDiff' onChange={formik.handleChange} value={formik.values.booking.anySignificantDiff}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="title">
              <span>Guests</span>
              <p className='advert-detail'>Once a booking has been made what actions are undertaken…</p>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Automation messaging for confirmation of booking and other details, such as balance payment due etc?  </label>
                  <Form.Select size='lg' name='guests.automationMessaging' onChange={formik.handleChange} value={formik.values.guests.automationMessaging}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Automation messaging for confirmation of the payment?   </label>
                  <Form.Select size='lg' name='guests.automationMessagingForPayment' onChange={formik.handleChange} value={formik.values.guests.automationMessagingForPayment}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Other automated information on location and property? </label>
                  <Form.Select size='lg' name='guests.automatedInfoOnLocation' onChange={formik.handleChange} value={formik.values.guests.automatedInfoOnLocation}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Link to a guest app which may or may not include 3? </label>
                  <Form.Select size='lg' name='guests.guestAppLink' onChange={formik.handleChange} value={formik.values.guests.guestAppLink}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Mailed paperwork, thank you message or freebies?  </label>
                  <Form.Select size='lg' name='guests.mailedPaperwork' onChange={formik.handleChange} value={formik.values.guests.mailedPaperwork}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Pre arrival information (key access, times, support contact details etc)   </label>
                  <Form.Select size='lg' name='guests.preArrivalInfo' onChange={formik.handleChange} value={formik.values.guests.preArrivalInfo}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>In-stay messages?</label>
                  <Form.Select size='lg' name='guests.inStayMessages' onChange={formik.handleChange} value={formik.values.guests.inStayMessages}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Post stay automated messages and review requests? </label>
                  <Form.Select size='lg' name='guests.postAutomatedMessages' onChange={formik.handleChange} value={formik.values.guests.postAutomatedMessages}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Personal phone calls for </label>
                  <Form.Select size='lg' name='guests.personalPhoneCalls' onChange={formik.handleChange} value={formik.values.guests.personalPhoneCalls}>
                    <option value="Post booking">Post booking</option>
                    <option value="Pre arrival">Pre arrival</option>
                    <option value="Post departure">Post departure</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Focussed and personal repeat marketing?  </label>
                  <Form.Select size='lg' name='guests.personalRepeatMarketing' onChange={formik.handleChange} value={formik.values.guests.personalRepeatMarketing}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do guests have access to a guest login section to see their bookings and entry codes etc?   </label>
                  <Form.Select size='lg' name='guests.guestHaveAccessToLogin' onChange={formik.handleChange} value={formik.values.guests.guestHaveAccessToLogin}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do guests have access to a separate mobile app?   </label>
                  <Form.Select size='lg' name='guests.guestHaveAccessToMobApp' onChange={formik.handleChange} value={formik.values.guests.guestHaveAccessToMobApp}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="title">
              <span>Owner Reporting</span>
              <p className="advert-detail">Owners, require reports.</p>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do Owners receive regular statements from the company?    </label>
                  <Form.Select size='lg' name='ownerReporting.ownerReceiveRegularStatement' onChange={formik.handleChange} value={formik.values.ownerReporting.ownerReceiveRegularStatement}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Are these tailored to avoid full disclosure on all gross income details, such as OTA involvement  </label>
                  <Form.Select size='lg' name='ownerReporting.areTailored' onChange={formik.handleChange} value={formik.values.ownerReporting.areTailored}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do bookings show all details including guest details? </label>
                  <Form.Select size='lg' name='ownerReporting.doBookingShowDetails' onChange={formik.handleChange} value={formik.values.ownerReporting.doBookingShowDetails}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Do owners have a separate login or application to access their account? </label>
                  <Form.Select size='lg' name='ownerReporting.doOwnerHaveSeperateLogin' onChange={formik.handleChange} value={formik.values.ownerReporting.doOwnerHaveSeperateLogin}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="title">
              <span>Company Reporting</span>
              <p className="advert-detail">Each company has a need for lots of reports, do you do the following ones:</p>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Reports on bookings: income, filters by properties, groups, dates, booking sources?  </label>
                  <Form.Select size='lg' name='companyReporting.reportsOnBooking' onChange={formik.handleChange} value={formik.values.companyReporting.reportsOnBooking}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Reports on outstanding balances and forward looking cash flows? </label>
                  <Form.Select size='lg' name='companyReporting.reportsOnBalances' onChange={formik.handleChange} value={formik.values.companyReporting.reportsOnBalances}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Payment reports, payments made, payments to be made, with appropriate filters?  </label>
                  <Form.Select size='lg' name='companyReporting.paymentReports' onChange={formik.handleChange} value={formik.values.companyReporting.paymentReports}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Graphical representations of bookings, ADR, pace etc?   </label>
                  <Form.Select size='lg' name='companyReporting.bookingGraphicalRepresentation' onChange={formik.handleChange} value={formik.values.companyReporting.bookingGraphicalRepresentation}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Booking splits by OTAs/direct and property segments/groups or individuals with appropriate date filters   </label>
                  <Form.Select size='lg' name='companyReporting.bookingSplits' onChange={formik.handleChange} value={formik.values.companyReporting.bookingSplits}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Depending on the payment methods and integrations to banking or not, are reconciliation reports generated? </label>
                  <Form.Select size='lg' name='companyReporting.reconciliationReports' onChange={formik.handleChange} value={formik.values.companyReporting.reconciliationReports}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="title">
              <span>Marketing</span>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company use a CRM system such as Hubspot? Or a mail based system, such as MailChimp? </label>
                  <Form.Select size='lg' name='marketing.companyUseCrm' onChange={formik.handleChange} value={formik.values.marketing.companyUseCrm}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>How frequently does the company undertake a mailer/newsletter </label>
                  <Form.Select size='lg' name='marketing.companyUndertakeMailer' onChange={formik.handleChange} value={formik.values.marketing.companyUndertakeMailer}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>What is the response rate to direct marketing to previous guests?  </label>
                  <Form.Select size='lg' name='marketing.directMarketingResponseRate' onChange={formik.handleChange} value={formik.values.marketing.directMarketingResponseRate}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Does the company actively market to new owners and how?   </label>
                  <Form.Select size='lg' name='marketing.companyActivelyMarket' onChange={formik.handleChange} value={formik.values.marketing.companyActivelyMarket}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>What % of the company income (not gross) spent on marketing?   </label>
                  <Form.Select size='lg' name='marketing.incomeSpentOnMarketing' onChange={formik.handleChange} value={formik.values.marketing.incomeSpentOnMarketing}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Is all marketing activity undertaken in-house? </label>
                  <Form.Select size='lg' name='marketing.marketingActivityUndertaken' onChange={formik.handleChange} value={formik.values.marketing.marketingActivityUndertaken}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10">
                <div className="form-group">
                  <label>Is PR ever used?  </label>
                  <Form.Select size='lg' name='marketing.isPrUsed' onChange={formik.handleChange} value={formik.values.marketing.isPrUsed}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="sub-title">
              <span>What site analysis tools are used:</span>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Traffic analysis?  </label>
                  <Form.Select size='lg' name='marketing.siteAnalysisTools.trafficAnalysis' onChange={formik.handleChange} value={formik.values.marketing.siteAnalysisTools.trafficAnalysis}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Heat Maps?</label>
                  <Form.Select size='lg' name='marketing.siteAnalysisTools.heatMaps' onChange={formik.handleChange} value={formik.values.marketing.siteAnalysisTools.heatMaps}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                  <label>User tracking?  </label>
                  <Form.Select size='lg' name='marketing.siteAnalysisTools.userTracking' onChange={formik.handleChange} value={formik.values.marketing.siteAnalysisTools.userTracking}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Key word and market analysis?</label>
                  <Form.Select size='lg' name='marketing.siteAnalysisTools.keywordAnalysis' onChange={formik.handleChange} value={formik.values.marketing.siteAnalysisTools.keywordAnalysis}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                  <label>Is PPC or online advertising used? </label>
                  <Form.Select size='lg' name='marketing.siteAnalysisTools.isPpcAdvertismentUsed' onChange={formik.handleChange} value={formik.values.marketing.siteAnalysisTools.isPpcAdvertismentUsed}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="title">
              <span>Metrics</span>
              <p className="advert-detail">Do you track and can you report: (select those that apply)</p>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.webTraffic" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Web traffic, clicks, conversions? </label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.comparativeBooking" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Comparative bookings by day/week/month</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.marginsOnBooking" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Margins on bookings (ADR etc)?</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.npsWithGuest" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>NPS with guests and Staff?</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.reviewsOnWeb" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Reviews on web and OTAs?</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.companyProfitability" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Company profitability?</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.staffRetention" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Staff retention?</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.personalSatisfaction" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Personal and staff satisfaction?</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.competitiveAnalysis" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Competitive analysis?</label>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12">
                <div className="form-check">
                 <input className='form-check-input' type="checkbox" name="metrics.other" onChange={formik.handleChange} value='yes' />
                 <label className='form-check-label'>Other?</label>
                </div>
              </div>
            </div>

            <div className="title">
              <span>ACQUISITION OF THE COMPANY</span>
              <p className="advert-detail" style={{textAlign:'justify'}}>Apart from the above, positioning the company for a sale and to get the best price will depend on a number of things, most listed below. The company will currently have a value but be different, depending on the acquirer. There is no real fixed way of assessing price, it may be multiple of profit or a per property metric, or interest in a location to fill a void or expand which adds a premium and all these things need consideration.</p>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Profitability. How much the company makes, how much it could make extra</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.companyProfit"
                    value={formik.values.companyAcquisition.companyProfit}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Contracts and owners. How stable and are the contracts solid, although this would be more important in a very litigious country (USA)</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.howStableContracts"
                    value={formik.values.companyAcquisition.howStableContracts}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Growth curve and how achieved</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.growthCurve"
                    value={formik.values.companyAcquisition.growthCurve}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Staff costs, liabilities and opportunities</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.staffCost"
                    value={formik.values.companyAcquisition.staffCost}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Hot-spotting of properties</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.hotSpottingProperty"
                    value={formik.values.companyAcquisition.hotSpottingProperty}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Property type focus</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.propertyTypeFocus"
                    value={formik.values.companyAcquisition.propertyTypeFocus}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Ease of transition with tech and data</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.easeOfTransition"
                    value={formik.values.companyAcquisition.easeOfTransition}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Clarity of information</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.clarity"
                    value={formik.values.companyAcquisition.clarity}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Level of direct business</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.directBuisness"
                    value={formik.values.companyAcquisition.directBuisness}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Brand strength</label>
                  <textarea
                    type="text"
                    name="companyAcquisition.brandStrength"
                    value={formik.values.companyAcquisition.brandStrength}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Directors/Key individuals engagement </label>
                  <textarea
                    type="text"
                    name="companyAcquisition.directors"
                    value={formik.values.companyAcquisition.directors}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>What are the current arrangements for cleaning and management of the properties and maintenance? This ideally is a list of the properties, their operational support and costs per turnover and the averages per type of property. </label>
                  <textarea
                    type="text"
                    name="companyAcquisition.arrangmentsForCleaning"
                    value={formik.values.companyAcquisition.arrangmentsForCleaning}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder='Answer'
                  />
                </div>
              </div>
            </div>

            

              
            <div className="title">
              <span>Property Information</span>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Major maintenance issues in past 3 years</label>
                  <textarea
                    type="text"
                    name="propertyDetails.maintenanceIssues"
                    value={formik.values.propertyDetails.maintenanceIssues}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Major maintenance issues in past 3 years"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Major owner issues in past 3 years</label>
                  <textarea
                    type="text"
                    name="propertyDetails.ownerIssues"
                    value={formik.values.propertyDetails.ownerIssues}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Major owner issues in past 3 years"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    Anything that may cause owner to stop short-term renting
                  </label>
                  <textarea
                    type="text"
                    name="propertyDetails.stopRentingReason"
                    value={formik.values.propertyDetails.stopRentingReason}
                    className="form-control"
                    onChange={formik.handleChange}
                    required
                    placeholder="Anything that may cause owner to stop short-term renting"
                  />
                </div>
              </div>
            </div>
  
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <label>Select Listing Images</label>
                  <input
                    name="photo"
                    multiple
                    type="file"
                    className="mt-3"
                    onChange={imageHandler}
                    required
                    accept="image/*"
                  style={{display:'flex',alignItems:'center'}}

                  />
                </div>
              </div>
            </div>
  
            <div className="listing-contract-btn">
            <button style={loader ? {opacity: '.75'} : {opacity: '1'}} type="submit" className="button">{loader ? 'Posting...' : 'Post Listing'}</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default BuisnessForSale