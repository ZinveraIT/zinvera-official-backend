import { Router } from 'express'
import zodValidator from '../../middleware/validator'
import { jobValidationSchema } from './jobs.validation'
import { JobControlloer } from './jobs.controller'
import auth from '../../middleware/auth'

const JobRouter = Router()

JobRouter.post(
  '/',
  zodValidator(jobValidationSchema),
  auth('admin'),
  JobControlloer.createJob
)
JobRouter.delete('/:id', auth('admin'), JobControlloer.deleteJob)
JobRouter.patch('/:id', auth('admin'), JobControlloer.updateJob)
JobRouter.get('/:id', JobControlloer.getSingleJob)
JobRouter.get('/', JobControlloer.getAllJobs)

// /api/admin/users/:userId/block

export default JobRouter
