import { getCustomRepository } from 'typeorm'
import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointments'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string
  date: Date
}

export default class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate) {
      throw Error('There is already an appointment scheduled')
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
