<?php

namespace App\Controller;

use App\Repository\DataRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchController extends AbstractController
{
    #[Route('/search', name: 'search_index', methods: ["GET"])]
    public function index(Request $request, DataRepository $dataRepository): Response
    {
        $search = $request->get('search');
        $rows = [];
        if ($search) {
            $rows = $dataRepository->findByName($search);
        }
        return $this->render('search/index.html.twig', [
            'rows' => $rows,
        ]);
    }
}