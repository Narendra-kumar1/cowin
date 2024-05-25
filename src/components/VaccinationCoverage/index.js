// Write your code here

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={props.data}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={props.data.dose1}
            tick={{
              strokeWidth: 1,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose 1" fill="#2d87bb" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
