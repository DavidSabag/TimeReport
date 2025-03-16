const { format } = require('date-fns');

function updateManagerReport(reports, employeeData, note, clock) {
    let newReports = null
    const isReportExist = reports.some(r => r.employeeId === employeeData.employeeId)
    if (isReportExist) {
        newReports = reports.map(report => {
            if (report.employeeId === employeeData.employeeId) {
                return {
                    ...report,
                    date: format(new Date(), 'MM/dd/yyyy'),
                    ...(clock === 'clockIn' && { startTime: format(new Date(), 'HH:mm') }),
                    ...(clock === 'clockOut' && { endTime: format(new Date(), 'HH:mm') }),
                    ...(note && { note })
                }
            }
            return report;
        })

    } else {
        newReports = [
            ...reports,
            {
                employeeId: employeeData.employeeId,
                name: `${employeeData.firstName} ${employeeData.lastName}`,
                date: format(new Date(), 'MM/dd/yyyy'),
                ...(clock === 'clockIn' && { startTime: format(new Date(), 'HH:mm') }),
                ...(clock === 'clockOut' && { endTime: format(new Date(), 'HH:mm') }),
                ...(note && { note })
            }
        ]
    }
    return newReports;
}

module.exports = { updateManagerReport }