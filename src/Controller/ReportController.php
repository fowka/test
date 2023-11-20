<?php

namespace App\Controller;

use App\Repository\DataRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReportController extends AbstractController
{
    #[Route('/report}', name: 'report_index', methods: ["GET"])]
    public function index(Request $request, DataRepository $dataRepository): Response {
        $parameters = [];
        foreach ($request->query as $key => $value) {
            if ($value) {
                $parameters[$key] = $value;
            }
        }
        return $this->render(
            'report/index.html.twig', [
                'rows' => $dataRepository->findBy($parameters)
            ],
        );
    }

}