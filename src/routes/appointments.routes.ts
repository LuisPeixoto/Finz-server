import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appoitments = await appointmentsRepository.find()

  return response.json(appoitments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appoitment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    })

    return response.json(appoitment)
  } catch (error) {
    console.log(request.body)
    return response.status(400).json({ error: error.message })
  }
})

export default appointmentsRouter
