// Write your code here
import {Component} from 'react'
import './index.css'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import Loader from 'react-loader-spinner'

const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'


class CowinDashboard extends Component {
  state = {obj: {}, isFail: false, loader: true}
  componentDidMount() {
    this.getData()
  }
  getData = async () => {
    try {
      const response = await fetch(vaccinationDataApiUrl)
      const result = await response.json()
      if (response.ok === true) {
        const updatedData = {
          VaccinationByCoverage: result.last_7_days_vaccination.map(item => ({
            dose1: item.dose_1,
            dose2: item.dose_2,
            vaccineDate: item.vaccine_date,
          })),
          VaccinationByAge: result.vaccination_by_age,
          VaccinationByGender: result.vaccination_by_gender,
        }

        this.setState({obj: {...updatedData}, isFail: false, loader: false})
      } else {
        this.setState({isFail: true, loader: false})
      }
    } catch (error) {
      this.setState({isFail: true, loader: false})
    }
  }

  render() {
    const {obj, isFail, loader} = this.state

    return (
      <div className="bg-container">
        <div className="content">
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <p className="para">co-WIN</p>
          </div>

          <h1 className="heading">CoWIN Vaccination in india</h1>
          {loader ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
            </div>
          ) : isFail ? (
            <div className="failure">
              <img
                src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                alt="failure view"
                className="image"
              />
              <p>Something went wrong</p>
            </div>
          ) : (
            <>
              <VaccinationCoverage data={obj.VaccinationByCoverage} />
              <VaccinationByGender data={obj.VaccinationByGender} />
              <VaccinationByAge data={obj.VaccinationByAge} />
            </>
          )}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
/*isFail ? (
            <div className="failure">
              <img
                src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                alt="failure view"
                className="image"
              />
              <p>Something went wrong</p>
            </div>
          ) */
