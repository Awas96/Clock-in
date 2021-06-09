<?php

namespace App\Controller;

use App\Entity\Turno;
use App\Entity\TurnosPredefinidos;
use App\Repository\TurnosPredefinidosRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/turnos/predefinidos", name="turnos_predefinidos_")
 */
class TurnosPredefinidosController extends AbstractController
{
    /**
     * @Route("/listar", name="listar")
     */
    public function index(TurnosPredefinidosRepository $predefinidosRepository): Response
    {
        $predefinidos = $predefinidosRepository->findAll();
        return $this->render('turnos_predefinidos/gestiona.html.twig', [
            'turnos' => $predefinidos
        ]);
    }

    /**
     * @Route("/crear", name="seccion_nueva")
     */
    public function gestionarSecciones(Request $request, TurnosPredefinidos $turno = null): Response
    {
        dump($request->isXMLHttpRequest());
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            dump($content);
            if (!empty($content)) {

                $params = json_decode($content, true);

                $inicio = new \Datetime(date('h:i', strtotime($params['HoraInicio'])));
                $fin = new \Datetime(date('h:i', strtotime($params['HoraFin'])));
                dump($params['HoraFin']);
                $em = $this->getDoctrine()->getManager();
                $turno = new TurnosPredefinidos();
                $turno->setHoraInicio($inicio);
                $turno->setHoraFin($fin);
                $em->persist($turno);
                $em->flush();

            }
            return new JsonResponse($turno->getId());
        }
        return new Response('Error!', 400);
    }
}
