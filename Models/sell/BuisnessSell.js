const listingModel = require("../ListingModel");
const mongoose = require("mongoose");
var options = { discriminatorKey: "type" };

// Listing Contract for sell
var BuisnessSell = listingModel.discriminator(
  "buisnessForSell",
  new mongoose.Schema(
    {
      listType: {
        type: String,
      },
      uniquiSellPoint: String,
      incorporationDate: String,
      companyAddress: String,
      companyNumber: Number,
      website: {
        type: String,
        required: [true, "Please Fill out the website field"],
      },
      companyLogo: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },

      teamInformation: {
        howBigIsTeam: Number,
        employees: [
          {
            name: String,
            yearsEmployed: Number,
            jobTime: String,
            role: String,
            grossSalary: String,
          },
        ],
        areEmployeesOnSameContract: String,
      },
      assets: {
        isCompanyLeaseOfficeSpace: String,
        companyHasFinancialAssets: String,
        companyHasSupplyAgreements: String,
        companyHasSecureLoans: String,
        companyUseTrustAcc: String,
        companyMerchantCard: String,
        companyUseBank: String,
      },
      ownersAndProperties: {
        details: [
          {
            area: String,
            numOfProperties2022: Number,
            grossRevenuePerArea: String,
            newProperties19To22: Number,
            lostProperties19to22: Number,
            generalType: String,
          },
        ],
        ownerHaveSameContract: String,
        terminationClauses: String,
        howRenewed: String,
        agreeOnYearlyTerm: String,
        customerAquisitionCost: String,
        avgNetProfitEachProperty: String,

        typesOfRentedProperties: {
          cottages: {
            numOfProperties: Number,
            grossBookingValue: Number,
            netProfitPerGroup: Number,
          },
          houses: {
            numOfProperties: Number,
            grossBookingValue: Number,
            netProfitPerGroup: Number,
          },
          appartments: {
            numOfProperties: Number,
            grossBookingValue: Number,
            netProfitPerGroup: Number,
          },
          logLodges: {
            numOfProperties: Number,
            grossBookingValue: Number,
            netProfitPerGroup: Number,
          },
          prods: {
            numOfProperties: Number,
            grossBookingValue: Number,
            netProfitPerGroup: Number,
          },
        },
      },

      baseBuisnessModal: {
        howPropertiesContracted: String,
        howCheckOrganised: String,
        companyOperateStdCommission: String,

        commissionStructure: {
          isVaryByProperty: String,
          isAnyBookingFees: String,
          isListingFeesonTopCommission: String,
          isAdditionalExtras: String,
          isCompanyUseDeposit: String,
          isCompanyTakeDamageDeposit: String,
          whenOwnersPaid: String,
        },
        isCompanyOperateLease: String,
        chargebackExperienced: String,
        anyFinancialInstruments: String,
        whoSuppliesPms: String,
        pmsCommercialTerms: String,
      },

      propertyOnboarding: {
        isStandardOnboarding: String,
        doYouUseExternalHelp: String,
        ownerChargedOnboardingFee: String,
        copyrightRetention: String,
        ownerCanOperationalManagment: String,
        premeetOwnerSales: String,
        companyOfferAssociatedServices: String,
        ownerHaveSayInPricing: String,
        ownerApproveLiveListing: String,
        ownerAskedToAdoptEntrySystem: String,
        staffMemberUploadProperty: String,
        ChannelsSupported: String,
        cardCharges: String,
        howPropertyAdded: String,
        manualActionsOnWebsite: String,
        arePropertiesDynamicPricing: String,
        whcihCommercialTerms: String,
        anyManualActions: String,
      },

      booking: {
        details: {
          directBookingOnWebsite: String,
          directBookingByCard: String,
          directBookingOverPhone: String,
          airBnb: String,
          vrbo: String,
          bookingcom: String,
          tripAdvisor: String,
          otherOta: String,
          overThePhone: String,
        },

        makeupOfBooking: {
          totalBookings: [
            {
              year19: Number,
              year20: Number,
              year21: Number,
              year22: Number,
            },
          ],
          avgNightBookedPerYear: [
            {
              year19: Number,
              year20: Number,
              year21: Number,
              year22: Number,
            },
          ],
          customerPercentageRepeatBooking: [
            {
              year19: Number,
              year20: Number,
              year21: Number,
              year22: Number,
            },
          ],
          percentGuestCancel: [
            {
              year19: Number,
              year20: Number,
              year21: Number,
              year22: Number,
            },
          ],
          avgAdvanceBookingWindow: [
            {
              year19: Number,
              year20: Number,
              year21: Number,
              year22: Number,
            },
          ],
          avgAdr: [
            {
              year19: Number,
              year20: Number,
              year21: Number,
              year22: Number,
            },
          ],
          avgStayTimes: [
            {
              year19: Number,
              year20: Number,
              year21: Number,
              year22: Number,
            },
          ],
        },
        anySignificantDiff: String,
      },

      guests: {
        automationMessaging: String,
        automationMessagingForPayment: String,
        automatedInfoOnLocation: String,
        guestAppLink: String,
        mailedPaperwork: String,
        preArrivalInfo: String,
        inStayMessages: String,
        postAutomatedMessages: String,
        personalPhoneCalls: String,
        personalRepeatMarketing: String,
        guestHaveAccessToLogin: String,
        guestHaveAccessToMobApp: String,
      },

      ownerReporting: {
        ownerReceiveRegularStatement: String,
        areTailored: String,
        doBookingShowDetails: String,
        doOwnerHaveSeperateLogin: String,
      },

      companyReporting: {
        reportsOnBooking: String,
        reportsOnBalances: String,
        paymentReports: String,
        bookingGraphicalRepresentation: String,
        bookingSplits: String,
        reconciliationReports: String,
      },

      marketing: {
        companyUseCrm: String,
        companyUndertakeMailer: String,
        directMarketingResponseRate: String,
        companyActivelyMarket: String,
        incomeSpentOnMarketing: String,
        marketingActivityUndertaken: String,
        isPrUsed: String,

        siteAnalysisTools: {
          trafficAnalysis: String,
          heatMaps: String,
          userTracking: String,
          keywordAnalysis: String,
          isPpcAdvertismentUsed: String,
        },
      },

      metrics: {
        webTraffic: Array,
        comparativeBooking: Array,
        marginsOnBooking: Array,
        npsWithGuest: Array,
        reviewsOnWeb: Array,
        companyProfitability: Array,
        staffRetention: Array,
        personalSatisfaction: Array,
        competitiveAnalysis: Array,
        other: Array,
      },

      companyAcquisition: {
        companyProfit: String,
        howStableContracts: String,
        growthCurve: String,
        staffCost: String,
        hotSpottingProperty: String,
        propertyTypeFocus: String,
        easeOfTransition: String,
        clarity: String,
        directBuisness: String,
        brandStrength: String,
        directors: String,
        arrangmentsForCleaning: String,
      },

      rentalKpis: {
        avgBookingValue: Number,
        avgOccupancyRate: Number,
        monthsLeftOnContract: Number,
        monthsUnderYourControl: Number,
      },

      propertyDetails: {
        maintenanceIssues: String,
        ownerIssues: String,
        stopRentingReason: String,
      },
    },
    options
  )
);

module.exports = { BuisnessSell };
