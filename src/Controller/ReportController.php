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
    private const PAGE_ROWS = 10;
    private const PAGE_SLUG = 'page';

    #[Route('/report', name: 'report_index', methods: ["GET"])]
    public function index(Request $request, DataRepository $dataRepository): Response {
        $page = $request->get('page', 1);
        $parameters = [];
        foreach ($request->query as $key => $value) {
            if ($key == self::PAGE_SLUG) {
                continue;
            }
            if ($value) {
                $parameters[$key] = $value;
            }
        }
        $rowsAll = $dataRepository->findBy($parameters);
        $pagesAmount = (int) ceil(count($rowsAll) / self::PAGE_ROWS);
        $pages = [];
        for ($pageNumber = 1; $pageNumber <= $pagesAmount; $pageNumber++) {
            $pages[$pageNumber] = $this->generateUrl('report_index', array_merge($parameters, ['page' => $pageNumber]));
        }
        $rows = $dataRepository->findBy($parameters, null, self::PAGE_ROWS, ($page - 1) * self::PAGE_ROWS);
        return $this->render(
            'report/index.html.twig', [
                'rows' => $rows,
                'pages' => $pages,
                'current' => $page,
            ],
        );
    }

}